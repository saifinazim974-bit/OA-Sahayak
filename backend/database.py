import sqlite3
from pathlib import Path
from datetime import datetime

DB_PATH = Path(__file__).parent / "data" / "oa_sahayak.db"

def get_conn():
    DB_PATH.parent.mkdir(exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_conn()
    conn.executescript("""
    CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_code TEXT UNIQUE,
        name TEXT NOT NULL,
        age INTEGER,
        sex TEXT,
        height REAL,
        weight REAL,
        bmi REAL,
        occupation TEXT,
        previous_injury TEXT,
        created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS screenings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER NOT NULL,
        pain INTEGER,
        stiffness INTEGER,
        mobility INTEGER,
        function_score INTEGER,
        gait_score REAL,
        rom_score REAL,
        risk_score INTEGER,
        risk_category TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY(patient_id) REFERENCES patients(id)
    );
    """)
    conn.commit()
    conn.close()

def save_patient(data):
    conn = get_conn()
    code = data.get("id") or f"OA-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    cur = conn.cursor()

    cur.execute("SELECT id FROM patients WHERE patient_code=?", (code,))
    row = cur.fetchone()

    if row:
        patient_id = row["id"]
        cur.execute("""UPDATE patients SET name=?, age=?, sex=?, height=?, weight=?,
                       bmi=?, occupation=?, previous_injury=? WHERE id=?""", (
            data.get("name"), data.get("age"), data.get("sex"),
            data.get("height"), data.get("weight"), data.get("bmi"),
            data.get("occupation"), data.get("injury"), patient_id))
    else:
        cur.execute("""INSERT INTO patients
            (patient_code,name,age,sex,height,weight,bmi,occupation,previous_injury,created_at)
            VALUES (?,?,?,?,?,?,?,?,?,?)""", (
            code, data.get("name"), data.get("age"), data.get("sex"),
            data.get("height"), data.get("weight"), data.get("bmi"),
            data.get("occupation"), data.get("injury"),
            datetime.now().isoformat(timespec="seconds")))
        patient_id = cur.lastrowid

    conn.commit()
    conn.close()
    return patient_id

def save_screening(patient_id, data, result):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""INSERT INTO screenings
        (patient_id,pain,stiffness,mobility,function_score,gait_score,rom_score,
         risk_score,risk_category,created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?)""", (
        patient_id, data.get("pain",0), data.get("stiffness",0),
        data.get("mobility",0), data.get("function",0),
        data.get("gaitScore",88), data.get("romScore",86),
        result["score"], result["category"],
        datetime.now().isoformat(timespec="seconds")))
    screening_id = cur.lastrowid
    conn.commit()
    conn.close()
    return screening_id

def get_screenings():
    conn = get_conn()
    rows = conn.execute("""SELECT s.id AS screening_id, p.patient_code,
        p.name, p.age, p.sex, s.pain, s.stiffness, s.mobility,
        s.gait_score, s.rom_score, s.risk_score, s.risk_category, s.created_at
        FROM screenings s JOIN patients p ON p.id=s.patient_id
        ORDER BY s.id DESC""").fetchall()
    conn.close()
    return [dict(r) for r in rows]
