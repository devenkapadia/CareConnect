FROM python:3.12-slim

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

COPY *.py /app/

COPY req /app/

RUN pip install --no-cache-dir -r req

RUN mkdir -p /app/backup

ENTRYPOINT ["python", "main.py"]