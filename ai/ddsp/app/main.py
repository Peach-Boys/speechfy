import os
import io
import time
import pickle
import numpy as np
import librosa
import gin
import tensorflow.compat.v2 as tf

import ddsp
import ddsp.training.models
import ddsp.training.metrics

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
import uvicorn

# 추가: WAV 저장을 위한 라이브러리
import soundfile as sf

# 샘플레이트 (노트북의 DEFAULT_SAMPLE_RATE: 16000)
SAMPLE_RATE = 16000

app = FastAPI()

# 전역 변수: 모델과 데이터셋 통계 정보를 저장
MODEL = None
DATASET_STATS = None

def load_model():
    """
    미리 학습된 DDSP 모델을 로드하고, gin 구성 파일 및 체크포인트를 복원하는 함수입니다.
    미리 학습된 모델은 '/tf/deploy_ddsp/Flute' 디렉토리에 저장되어 있어야 합니다.
    """
    global MODEL, DATASET_STATS

    # 미리 학습된 모델 디렉토리 (필요에 따라 경로 변경)
    PRETRAINED_DIR = '../pretrained/guitar'
    if not os.path.exists(PRETRAINED_DIR):
        raise FileNotFoundError(f"모델 디렉토리 '{PRETRAINED_DIR}'를 찾을 수 없습니다.")

    # gin 구성 파일 로드 (operative_config-0.gin)
    gin_file = os.path.join(PRETRAINED_DIR, 'operative_config-0.gin')
    if not os.path.exists(gin_file):
        raise FileNotFoundError(f"gin 파일 '{gin_file}'를 찾을 수 없습니다.")

    # dataset_statistics.pkl 파일 로드 (없어도 진행 가능)
    dataset_stats_file = os.path.join(PRETRAINED_DIR, 'dataset_statistics.pkl')
    if os.path.exists(dataset_stats_file):
        try:
            with open(dataset_stats_file, 'rb') as f:
                DATASET_STATS = pickle.load(f)
            print("Dataset statistics 로드 완료")
        except Exception as err:
            print("Dataset statistics 로드 실패:", err)
    else:
        print("dataset_statistics.pkl 파일을 찾을 수 없습니다.")

    # gin 구성 파싱
    with gin.unlock_config():
        gin.parse_config_file(gin_file, skip_unknown=True)

    # 체크포인트 파일 찾기 (체크포인트 파일 중 첫 번째 파일 사용)
    ckpt_files = [f for f in os.listdir(PRETRAINED_DIR) if 'ckpt' in f and not f.endswith('.meta')]
    if not ckpt_files:
        raise FileNotFoundError("체크포인트 파일을 찾을 수 없습니다.")
    ckpt_files.sort()
    ckpt_name = ckpt_files[0].split('.')[0]
    ckpt = os.path.join(PRETRAINED_DIR, ckpt_name)
    print("체크포인트:", ckpt)

    # 모델 생성 및 복원
    MODEL = ddsp.training.models.Autoencoder()
    MODEL.restore(ckpt)
    print("모델 복원 완료")

# FastAPI 서버 시작 시 모델 로드
@app.on_event("startup")
async def startup_event():
    try:
        load_model()
    except Exception as e:
        print("모델 로드 중 오류 발생:", e)

def shift_ld(features, ld_shift=0.0):
    """볼륨(loudness_db)을 이동"""
    features['loudness_db'] += ld_shift
    return features

def shift_f0(features, pitch_shift=0.0):
    """피치(f0_hz)를 이동. pitch_shift 값은 옥타브 단위."""
    features['f0_hz'] *= 2.0 ** (pitch_shift)
    features['f0_hz'] = np.clip(features['f0_hz'], 0.0, librosa.midi_to_hz(110.0))
    return features

def process_audio_chunk(audio_chunk, pitch_shift, loudness_shift, time_steps_train, n_samples_train):
    """
    한 청크(예: 4초 분량)의 오디오를 받아서 timbre transfer를 수행하는 함수.
    """
    # audio_chunk: shape (1, n_samples_chunk)
    hop_size = int(n_samples_train / time_steps_train)

    # 오디오 특징 추출
    audio_features = ddsp.training.metrics.compute_audio_features(audio_chunk)
    audio_features = shift_ld(audio_features, loudness_shift)
    audio_features = shift_f0(audio_features, pitch_shift)

    # gin 파라미터는 이미 학습 시 설정된 값(time_steps_train, n_samples_train)을 사용
    # 각 특징 벡터를 모델 입력 길이에 맞게 자르기
    for key in ['f0_hz', 'f0_confidence', 'loudness_db']:
        audio_features[key] = audio_features[key][:time_steps_train]
    audio_features['audio'] = audio_features['audio'][:, :n_samples_train]

    # 모델 추론
    outputs = MODEL(audio_features, training=False)
    generated_audio = MODEL.get_audio_from_outputs(outputs)
    return generated_audio

def process_audio_full(audio_bytes: bytes, pitch_shift: float = 0.0, loudness_shift: float = 0.0):
    """
    업로드된 오디오 파일 전체를 슬라이딩 윈도우 방식으로 처리합니다.
    
    반환:
      - original_audio: 원본 오디오 numpy array (shape: (1, total_samples))
      - generated_audio_full: 전체 변환된 오디오 numpy array (shape: (1, total_samples))
    """
    # 전체 오디오 로드 (모노, SAMPLE_RATE로 리샘플링)
    audio_np, sr = librosa.load(io.BytesIO(audio_bytes), sr=SAMPLE_RATE, mono=True)
    audio_np = np.expand_dims(audio_np, axis=0)  # shape: (1, total_samples)
    total_samples = audio_np.shape[1]

    # 학습 시 사용된 고정 길이 정보
    time_steps_train = gin.query_parameter('F0LoudnessPreprocessor.time_steps')
    n_samples_train = gin.query_parameter('Harmonic.n_samples')
    chunk_length = n_samples_train  # 한 청크의 샘플 수 (예: 4초 분량)

    generated_audio_chunks = []
    start = 0
    while start + chunk_length <= total_samples:
        audio_chunk = audio_np[:, start:start+chunk_length]
        gen_chunk = process_audio_chunk(audio_chunk, pitch_shift, loudness_shift, time_steps_train, n_samples_train)
        generated_audio_chunks.append(gen_chunk)
        start += chunk_length

    # 남은 부분 처리 (있다면)
    if start < total_samples:
        remaining = audio_np[:, start:]
        pad_width = chunk_length - remaining.shape[1]
        # 남은 부분을 0으로 패딩하여 청크 길이 맞춤
        audio_chunk = np.pad(remaining, ((0, 0), (0, pad_width)), mode='constant')
        gen_chunk = process_audio_chunk(audio_chunk, pitch_shift, loudness_shift, time_steps_train, n_samples_train)
        # 패딩한 부분은 잘라내고 원래 길이만 사용
        gen_chunk = gen_chunk[:, :remaining.shape[1]]
        generated_audio_chunks.append(gen_chunk)

    # 모든 청크를 이어붙임
    generated_audio_full = np.concatenate(generated_audio_chunks, axis=1)
    return audio_np, generated_audio_full

@app.post("/transfer")
async def timbre_transfer(
    file: UploadFile = File(...),
    pitch_shift: float = Form(0.0),
    loudness_shift: float = Form(0.0)
):
    """
    timbre transfer API 엔드포인트.
    
    - 파일 업로드 (wav, mp3 등) 및 선택적으로 피치와 볼륨 조정 인자를 받아 timbre transfer를 수행합니다.
    - 변환된 오디오를 WAV 파일로 반환합니다.
    """
    try:
        contents = await file.read()
        original_audio, generated_audio = process_audio_full(contents, pitch_shift, loudness_shift)
        
        # 생성된 오디오를 WAV 파일로 저장 (임시 파일)
        output_path = "generated.wav"
        # generated_audio의 shape은 (1, n_samples)이므로 첫 번째 행 사용
        sf.write(output_path, generated_audio[0], SAMPLE_RATE)
        
        return FileResponse(output_path, media_type="audio/wav", filename="generated.wav")
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})

@app.get("/")
async def root():
    return {"message": "DDSP 기반 Timbre Transfer API입니다."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000)
