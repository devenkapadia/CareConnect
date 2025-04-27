FROM python:3.12-slim

WORKDIR /app

COPY *.py /app/

COPY req /app/

RUN pip install --no-cache-dir -r req

ENTRYPOINT ["python", "main.py"]