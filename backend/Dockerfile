FROM python:3.11

WORKDIR /app

COPY backend/backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY backend .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
