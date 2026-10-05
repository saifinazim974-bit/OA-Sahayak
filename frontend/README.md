# OA-Sahayak Frontend

AI-assisted Osteoarthritis (OA) risk screening frontend prototype.

## Run

No build tools are required.

1. Extract the ZIP.
2. Open `index.html` in a browser.
3. For camera access, use a local server rather than opening the file directly.

### Recommended with Python 3.12

```bash
cd OA-Sahayak-Frontend
python -m http.server 5500
```

Open:

`http://localhost:5500`

## Current prototype features

- Responsive healthcare-worker dashboard
- Patient registration
- OA symptom and mobility screening
- Browser camera permission flow
- Prototype gait/ROM result placeholders
- Explainable demo risk score
- Screening result page
- Patient history
- Browser localStorage persistence
- English/Hindi dashboard labels
- Offline-friendly local record storage

## Important

The risk calculation and movement values in this frontend are **prototype/demo logic**, not a clinically validated OA diagnostic model. For a real deployment, the model must be trained/validated on appropriate clinical data and reviewed by qualified medical experts.

## Connected to Flask

Keep the Flask backend running on `http://127.0.0.1:5000`.

Run the frontend separately:

    python -m http.server 5500

Open:

    http://localhost:5500

The assessment form sends screening data to `POST /api/screen`.
Dashboard and Patient History retrieve records from `GET /api/screenings`.

## v2 correction

The patient form now has an explicit JavaScript submit interception so patient
details are not appended to the browser URL. Keep the Flask backend running
while testing the screening flow.
