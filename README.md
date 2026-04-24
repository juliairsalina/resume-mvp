# How to open and run the project
**1. Go to project folder**
cd ~/resume-mvp

**2. Activate virtual environment**
source .venv/bin/activate

**3. Run FastAPI backend**
uvicorn backend.main:app --reload

Open backend test:

http://127.0.0.1:8000

Open API docs:

http://127.0.0.1:8000/docs

Open another terminal:

**4. Go to frontend folder**
cd ~/resume-mvp/frontend

**5. Run frontend local server**
python3 -m http.server 5500

Open frontend:

http://127.0.0.1:5500
