from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.schemas import MockAnalysisResponse
from backend.parser import build_mock_resume_json
from backend.evaluator import build_mock_benchmark_result

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Resume MVP backend is running"}

@app.get("/mock-analysis", response_model=MockAnalysisResponse)
def mock_analysis():
    resume_json = build_mock_resume_json()
    benchmark = build_mock_benchmark_result()

    return {
        "resume_json": resume_json,
        "benchmark": benchmark
    }