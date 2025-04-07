from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from threading import Thread

import torchaudio
import torch
from audiocraft.models import MusicGen
from audiocraft.data.audio import audio_write

import os
import uuid
import requests
from typing import Tuple
from ComposeRequest import ComposeRequest


# ----- FastAPI 세팅 -----
app = FastAPI()

# CORS 허용 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 배포 시 도메인으로 제한해야 됨됨
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----- 모델 세팅 -----
print(torch.cuda.is_available())  # True
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# MusicGen 모델 로드 (GPU 사용)
model = MusicGen.get_pretrained('facebook/musicgen-melody', device='cuda')
model.set_generation_params(duration=30)  # 생성 길이 설정 (초)


# ----- 메인 API -----
@app.post("/api/compose")
async def compose_music(request: ComposeRequest):
    try:
        # ✅ 1. 즉시 202 Accepted 응답 반환
        Thread(target=run_composition_async, args=(request,)).start()
        return JSONResponse(status_code=202, content={"message": "작곡 요청이 접수되었습니다."})
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "message": "error",
            "detail": str(e)
        })



# ----- 비동기 작곡 실행 로직 -----
def run_composition_async(request: ComposeRequest):
    try:
        # 1. 고유 ID 생성
        # input_id: 무작위로 고유한 문자열을 생성한 후 앞 8글자만 잘라서 파일 이름으로 사용
        # input_path: 업로드한 파일을 임시로 저장할 경로를 만듦 (예: input_f2a7e01b.wav)
        input_id = str(uuid.uuid4())[:8]
        input_path = f"input_{input_id}.wav"
        print(f"1. 고유 ID 생성 완료, input_id: {input_id}, input_path: {input_path}")
            
        # 2. signedUrl에서 파일 다운로드
        response = requests.get(request.signedUrl)
        print("2-1. 파일 생성 전")
        print("response.status_code:", response.status_code)
        
        if response.status_code != 200:
            print("error:", response.content)
            return JSONResponse(status_code=400, content={
                "message": "Failed to download file from signedUrl"
            })

        with open(input_path, "wb") as f:
            f.write(response.content)
        
        print("2-2. signedUrl에서 파일 다운로드 완료")

        # 3. 오디오 로드 후 임시 파일 삭제
        # 생성에 참고할 음악 추출함
        melody, sr = torchaudio.load(input_path)
        os.remove(input_path)  # 임시 파일 삭제
        print("3. 오디오 로드 완료 및 임시 파일 삭제")

        # 4. AI 작곡 수행
        # 주어진 오디오와 설명을 바탕으로 음악을 생성
        # 한 번에 여러 description의 음악을 생성하고 싶다면 melody[None].expand(3, -1, -1) 이런식으로 텐서를 확장해서 사용하면 됨.
        # sr: sampling rate(샘플링 레이트)를 나타냄. 초당 샘플의 수를 결정하는 값으로 44100 Hz는 CD 품질의 샘플링 레이트라고 함.
        print("4-1. AI 작곡 시작")
        prompt = request.prompt
        wav_output = model.generate_with_chroma([prompt], melody[None], sr)
        print("4-2. AI 작곡 완료")

        # 5. 로컬에 결과 파일 저장
        output_path = f"output_{input_id}.wav"
        audio_write(output_path.replace(".wav", ""), wav_output[0].cpu(), model.sample_rate, strategy="loudness")
        print("5. 결과 파일 저장 완료:", output_path)
        

        # 6. Spring 서버에 presigned URL 요청
        upload_url, aiSongFilePath = request_presigned_url_from_spring(request.userId)
        print("6. presigned URL 요청 완료:", upload_url)
        

        # 7. 결과물을 presigned URL로 업로드
        upload_to_presigned_url(upload_url, output_path)
        print("7. 결과물 S3 업로드 완료")
        

        # 8. 결과 콜백 → Spring 서버에 POST
        notify_spring_server(
            studio_id=request.studioId,
            user_id=request.userId,
            data={
                "aiSongFilePath": aiSongFilePath,
                "mood": request.mood,
                "genre": request.genre,
                "name": request.name,
                "instrumentsString": request.instrumentsString,
            }
        )
        print("8. Spring 서버에 결과 저장 요청 완료")

        # 9. 로컬 파일 정리
        os.remove(output_path)
        print("9. 로컬 파일 정리 완료")

        print("AI 작곡 완료 및 Spring 서버 저장 요청 전송됨")

    except Exception as e:
        print("AI 작곡 중 오류 발생:", str(e))


# ----- Presigned URL 요청 -----
def request_presigned_url_from_spring(user_id: int) -> Tuple[str, str]:
    cookies = {"userId": str(user_id)}
    
    try:
        res = requests.get("http://localhost:8080/api/song/ai/presignedUrl", cookies=cookies)
        res.raise_for_status() 
        data = res.json()
        return data["aiSongPresignedUrl"], data["aiSongFilePath"]
    except requests.RequestException as e:
        raise Exception(f"Failed to get presigned URL: {str(e)}")
    

# ----- S3 업로드 -----
def upload_to_presigned_url(presigned_url: str, local_file_path: str):
    headers = {
        "Content-Type": "audio/wav"
    }

    with open(local_file_path, "rb") as f:
        res = requests.put(presigned_url, data=f, headers=headers)
        res.raise_for_status()

    if res.status_code == 200:
        print("S3 업로드 성공!")
    else:
        print("S3 업로드 실패:", res.status_code)
        
        
# ----- Spring 서버로 최종 저장 요청 -----
def notify_spring_server(studio_id: int, user_id: int, data: dict):
    try:
        cookies = {"userId": str(user_id)}
        url = f"http://localhost:8080/studios/{studio_id}/ai/save"
        res = requests.post(url, json=data, cookies=cookies)
        res.raise_for_status()
        print("Spring 서버에 결과 저장 요청 성공")
    except requests.RequestException as e:
        print("Spring 서버 저장 요청 실패:", str(e))