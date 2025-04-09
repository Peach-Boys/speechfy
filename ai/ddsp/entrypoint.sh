#!/bin/bash
set -e

# 백그라운드에서 Jupyter Notebook 실행
jupyter notebook --ip 0.0.0.0 --no-browser --allow-root &

# uvicorn 실행 (foreground에서 실행)
exec uvicorn main:app --reload --host 0.0.0.0 --port 3000
