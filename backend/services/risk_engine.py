def calculate_risk(data):
    """Prototype screening score.
    This is NOT a clinically validated diagnostic model.
    """
    score = 0

    age = float(data.get("age", 0) or 0)
    bmi = float(data.get("bmi", 0) or 0)
    pain = float(data.get("pain", 0) or 0)
    stiffness = float(data.get("stiffness", 0) or 0)
    mobility = float(data.get("mobility", 0) or 0)
    function_score = float(data.get("function", 0) or 0)
    gait = float(data.get("gaitScore", 88) or 88)
    rom = float(data.get("romScore", 86) or 86)

    if age >= 60:
        score += 15
    elif age >= 50:
        score += 10
    elif age >= 40:
        score += 5

    if bmi >= 30:
        score += 15
    elif bmi >= 25:
        score += 8

    score += pain * 4
    score += stiffness * 4
    score += mobility * 5
    score += function_score * 3

    if str(data.get("injury", "")).lower() == "yes":
        score += 10

    score += max(0, 100 - gait) * 0.12
    score += max(0, 100 - rom) * 0.12

    score = min(100, round(score))

    if score < 35:
        category = "LOW"
    elif score < 65:
        category = "MODERATE"
    else:
        category = "HIGH"

    return {
        "score": score,
        "category": category,
        "clinical_note": (
            "Screening indication only; clinical evaluation is recommended."
            if category == "HIGH"
            else "Screening indication only; not a definitive diagnosis."
        )
    }
