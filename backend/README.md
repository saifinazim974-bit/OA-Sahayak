# OA-Sahayak Backend

Flask + SQLite REST API for the OA-Sahayak frontend.

## 1. Create virtual environment

Windows:

    python -m venv venv
    venv\Scripts\activate

## 2. Install dependencies

    pip install -r requirements.txt

## 3. Start server

    python app.py

API runs at:

    http://127.0.0.1:5000

## 4. Test

Open:

    http://127.0.0.1:5000/api/health

Expected:

    {"service":"OA-Sahayak API","status":"ok"}

## API

GET /api/health
POST /api/screen
GET /api/screenings

The risk engine is demonstration logic only. It is not a clinically validated OA diagnostic model.
