# 🦴 OA-Sahayak

### AI-Assisted Early Detection System for Osteoarthritis (OA) Risk Markers

OA-Sahayak is an AI-assisted, offline-first screening platform designed to support the **early identification of osteoarthritis (OA) risk indicators**, especially in rural and primary healthcare settings.

The system combines patient information, symptom screening, mobility assessment, and movement-related indicators to generate a **preliminary risk indication** and provide preventive guidance or referral recommendations.

> ⚠️ **Medical Disclaimer:** OA-Sahayak is a screening and risk-assessment tool. It does not provide a definitive medical diagnosis. Clinical evaluation by a qualified healthcare professional is required for diagnosis and treatment.

---

## 🌐 Live Demo

### 🚀 Live Website
https://oa-sahayak-1.onrender.com

### 🔗 Backend API
https://oa-sahayak.onrender.com/api/health

### 💻 GitHub Repository
https://github.com/saifinazim974-bit/OA-Sahayak

---

## 🎯 Problem Statement

**Problem Statement ID: 26004**

### AI-Assisted Early Detection System for Osteoarthritis (OA) Risk Markers in North Eastern Region (NER)

Osteoarthritis can significantly affect mobility and quality of life. Early identification of risk indicators can help individuals receive preventive guidance and seek appropriate clinical evaluation.

However, rural and underserved healthcare environments may face challenges such as:

- Limited access to specialists
- Low awareness of early OA symptoms
- Poor connectivity
- Limited diagnostic infrastructure
- Lack of digital patient records
- Difficulty performing regular screening

OA-Sahayak aims to provide an affordable and accessible preliminary screening solution.

---

## 💡 Our Solution

OA-Sahayak provides a simple digital workflow for healthcare workers and patients:

```text
Patient Registration
        ↓
Symptom & Mobility Assessment
        ↓
Movement / Gait Indicators
        ↓
AI-Assisted Risk Scoring
        ↓
LOW / MODERATE / HIGH
        ↓
Preventive Guidance / Clinical Referral
        ↓
Digital Screening Record

✨ Key Features
👤 Patient Registration
- Patient name and identification
- Age and basic demographic information
- Height and weight
- BMI calculation
📝 Symptom Screening
The system evaluates:
- Pain severity
- Morning stiffness
- Mobility difficulty
- Difficulty with stairs
- Squatting difficulty
- Rising from a chair
- Previous joint injury
🚶 Movement Assessment
The prototype provides movement-related indicators such as:
- Gait symmetry
- Range of Motion (ROM)
- Posture assessment
The current MVP uses prototype movement values. Real-time computer-vision-based pose estimation can be integrated using MediaPipe/OpenCV in the next development phase.

🤖 AI-Assisted Risk Scoring
The screening engine combines multiple indicators to generate a preliminary risk score:
0 – 34    → LOW
35 – 64   → MODERATE
65 – 100  → HIGH

The score considers factors such as:
- Age
- BMI
- Pain
- Stiffness
- Mobility
- Functional difficulty
- Previous injury
- Gait indicator
- ROM indicator
📊 Dashboard
Healthcare workers can view:
- Total patients screened
- High-risk cases
- Today's screenings
- Recent screening results
📋 Patient History
Screening records include:
- Patient name
- Patient ID
- Screening date
- Risk score
- Risk category
🌐 Multilingual Interface
The interface supports:
- English
- Hindi
The design is intended to be simple and accessible for healthcare workers and rural users.
📱 Responsive Design
The interface is designed for:
- Desktop
- Laptop
- Tablet
- Mobile devices
🏗️ System Architecture
                ┌─────────────────────┐
                │       Patient       │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  OA-Sahayak UI      │
                │ HTML/CSS/JavaScript │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │    Flask Backend    │
                │      REST API       │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │    Risk Engine      │
                │   AI/ML Prototype   │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   Patient Records   │
                │   Database Layer    │
                └─────────────────────┘

🛠️ Technology Stack
Frontend
- HTML5
- CSS3
- JavaScript
- Responsive Web Design
- Local Storage
Backend
- Python
- Flask
- Flask-CORS
- REST API
- Gunicorn
Database
- SQLite for the current prototype
- PostgreSQL planned for persistent cloud deployment
AI / Computer Vision
Planned / extendable:
- MediaPipe
- OpenCV
- Pose Estimation
- Gait Analysis
- Range of Motion Analysis
- Machine Learning Risk Prediction
Deployment
- GitHub
- Render
📁 Project Structure
OA-Sahayak/
│
├── frontend/
│   ├── index.html
│   ├── patient.html
│   ├── assessment.html
│   ├── result.html
│   ├── history.html
│   ├── dashboard.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── app.js
│
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── requirements.txt
│   │
│   ├── services/
│   │   └── risk_engine.py
│   │
│   └── data/
│       └── oa_sahayak.db
│
├── .gitignore
└── README.md

🚀 Running Locally
1. Clone the repository
git clone https://github.com/saifinazim974-bit/OA-Sahayak.git
cd OA-Sahayak

2. Create a virtual environment
python -m venv venv

3. Activate the environment
Windows
venv\Scripts\activate

4. Install backend dependencies
cd backend
pip install -r requirements.txt

5. Start Flask backend
python app.py

The backend will run at:
http://127.0.0.1:5000

6. Run the frontend
Open:
frontend/index.html

in your browser.
🔌 API Endpoints
Health Check
GET /api/health

Example:
{
  "service": "OA-Sahayak API",
  "status": "ok"
}

Submit Screening
POST /api/screen

Get Screening Records
GET /api/screenings

📊 Risk Assessment
The prototype uses a transparent weighted scoring approach.
Example factors:
Factor	Contribution
Age	0–15
BMI	0–15
Pain	0–40
Stiffness	0–12
Mobility	0–15
Functional difficulty	0–9
Previous injury	0–10
Gait indicator	Prototype
ROM indicator	Prototype


The final score is normalized to:
0 – 100

Risk classification:
Score	Category
0–34	🟢 LOW
35–64	🟡 MODERATE
65–100	🔴 HIGH


These thresholds are prototype thresholds and are not clinically validated diagnostic criteria.

🔐 Privacy & Security
OA-Sahayak is designed with privacy and secure handling of patient information in mind.
Future production improvements include:
- Encrypted patient data
- Authentication and authorization
- Role-based access control
- Secure API communication
- PostgreSQL-based persistent storage
- Audit logs
- Data minimization
- Secure cloud deployment
🌐 Offline-First Approach
The system is designed with low-connectivity healthcare environments in mind.
The planned architecture supports:
Offline Assessment
       ↓
Local Data Storage
       ↓
Network Available?
       ↓
      YES
       ↓
Synchronize with Server

This approach can make the platform more suitable for:
- Rural healthcare centers
- Primary Health Centres
- Community health workers
- Remote screening camps
🔮 Future Enhancements
1. Real-Time Pose Estimation
Integrate:
- MediaPipe Pose
- OpenCV
- Camera-based joint tracking
for real-time movement analysis.
2. Machine Learning Model
Replace the prototype scoring engine with a clinically validated ML model trained on appropriate datasets.
Potential models:
- Random Forest
- XGBoost
- Logistic Regression
- Neural Networks
3. Gait Analysis
Automatically calculate:
- Step symmetry
- Walking speed
- Joint angles
- Stride characteristics
- Knee movement
4. ROM Analysis
Camera-based estimation of:
- Knee flexion
- Knee extension
- Hip movement
- Joint angle ranges
5. Doctor / PHC Dashboard
Add:
- Patient search
- Case prioritization
- Referral management
- Follow-up tracking
- Screening history
6. Persistent Cloud Database
Migrate from SQLite to:
PostgreSQL

for reliable cloud persistence.
7. More Indian Languages
Potential support:
- Hindi
- English
- Bengali
- Assamese
- Marathi
- Tamil
- Telugu
🎯 Target Users
OA-Sahayak is intended to support:
- Primary Healthcare Centres
- Community Health Workers
- Rural Healthcare Providers
- Screening Camps
- Patients in underserved regions
- Healthcare administrators
🌍 Social Impact
OA-Sahayak aims to help improve early awareness of OA risk indicators by making preliminary screening:
- Affordable
- Accessible
- Digital
- Simple
- Low-connectivity friendly
- Scalable
The platform can help healthcare workers identify people who may benefit from further clinical evaluation.
👨‍💻 Hackathon Project
Project: OA-Sahayak
Problem Statement ID: 26004
Domain: Healthcare / AI / Machine Learning
Focus: Osteoarthritis Early Risk Screening
⚠️ Medical Disclaimer
OA-Sahayak provides preliminary screening and risk indication only.
It is not a replacement for:
- Medical diagnosis
- X-ray or imaging
- Laboratory investigations
- Specialist consultation
- Professional clinical assessment
Any moderate- or high-risk indication should be reviewed by a qualified healthcare professional.
📜 License
This project is developed as a hackathon prototype for educational and innovation purposes.

### GitHub par kaise lagana hai

Tumhare repository me:

**GitHub → OA-Sahayak → README.md → ✏️ Edit → pura old content remove → upar wala content paste → Commit changes**

Live website:

[OA-Sahayak Live Demo](https://oa-sahayak-1.onrender.com?utm_source=chatgpt.com)

GitHub:

[OA-Sahayak Repository](https://github.com/saifinazim974-bit/OA-Sahayak?utm_source=chatgpt.com)
