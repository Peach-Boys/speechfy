# 1. 베이스 이미지 설정 (Python + CUDA 환경)
FROM pytorch/pytorch:2.1.0-cuda12.1-cudnn8-runtime

# 2. 작업 디렉토리 생성
WORKDIR /app

# 3. requirements 복사 & 설치
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# 4. 앱 코드 복사
COPY . .

# 5. 포트 개방
EXPOSE 8000

# 6. FastAPI 서버 실행 명령
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
