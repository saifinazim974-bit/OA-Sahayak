from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, save_patient, save_screening, get_screenings
from services.risk_engine import calculate_risk

app = Flask(__name__)
CORS(app)

init_db()

@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "service": "OA-Sahayak API"})

@app.post("/api/screen")
def screen():
    data = request.get_json(silent=True) or {}

    required = ["name", "age"]
    missing = [x for x in required if x not in data or data[x] in ("", None)]
    if missing:
        return jsonify({"error": "Missing fields", "fields": missing}), 400

    result = calculate_risk(data)
    patient_id = save_patient(data)
    screening_id = save_screening(patient_id, data, result)

    return jsonify({
        "success": True,
        "patient_id": patient_id,
        "screening_id": screening_id,
        **result
    }), 201

@app.get("/api/screenings")
def screenings():
    return jsonify({"success": True, "records": get_screenings()})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
