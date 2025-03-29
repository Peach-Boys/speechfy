from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import torchaudio
import torch
from audiocraft.models import MusicGen
from audiocraft.data.audio import audio_write

import os
import uuid

app = FastAPI()

# CORS 허용 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 배포 시 도메인으로 제한해야 됨됨
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print(torch.cuda.is_available())  # True
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# MusicGen 모델 로드 (GPU 사용)
model = MusicGen.get_pretrained('facebook/musicgen-melody', device='cuda')
model.set_generation_params(duration=30)  # 생성 길이 설정 (초)

@app.post("/api/compose")
async def compose_music(
    audio: UploadFile = File(...),
    prompt: str = Form(...)
):
    try:
        # 파일 저장
        # input_id: 무작위로 고유한 문자열을 생성한 후 앞 8글자만 잘라서 파일 이름으로 사용
        # input_path: 업로드한 파일을 임시로 저장할 경로를 만듦 (예: input_f2a7e01b.wav)
        input_id = str(uuid.uuid4())[:8]
        input_path = f"input_{input_id}.wav"
        with open(input_path, "wb") as f:
            f.write(await audio.read())

        # 생성에 참고할 음악 추출
        melody, sr = torchaudio.load(input_path)
        os.remove(input_path)  # 임시 파일 삭제

        # AI 작곡
        # 주어진 오디오와 설명을 바탕으로 음악을 생성
        # 한 번에 여러 description의 음악을 생성하고 싶다면 melody[None].expand(3, -1, -1) 이런식으로 텐서를 확장해서 사용하면 됨.
        # sr: sampling rate(샘플링 레이트)를 나타냄. 초당 샘플의 수를 결정하는 값으로 44100 Hz는 CD 품질의 샘플링 레이트라고 함.
        wav_output = model.generate_with_chroma([prompt], melody[None], sr)

        # 결과 저장
        output_path = f"output_{input_id}.wav"
        audio_write(output_path.replace(".wav", ""), wav_output[0].cpu(), model.sample_rate, strategy="loudness")

        return JSONResponse(content={
            "message": "success",
            "output_file": output_path
        })

    except Exception as e:
        return JSONResponse(status_code=500, content={
            "message": "error",
            "detail": str(e)
        })
