from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.schemas import MockAnalysisResponse, ReevaluateRequest, ReevaluateResponse
from backend.parser import build_mock_resume_json
from backend.evaluator import evaluate_resume

from backend.schemas import RewriteRequest, RewriteResponse

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
    benchmark = evaluate_resume(resume_json)

    return {
        "resume_json": resume_json,
        "benchmark": benchmark
    }

@app.post("/reevaluate", response_model=ReevaluateResponse)
def reevaluate(request: ReevaluateRequest):
    try:
        resume_json = request.resume_json.model_dump()
    except AttributeError:
        resume_json = request.resume_json.dict()

    benchmark = evaluate_resume(resume_json)

    return {
        "benchmark": benchmark
    }

@app.post("/rewrite", response_model=RewriteResponse)
def rewrite(request: RewriteRequest):
    suggestions = [
        {
            "version": 1,
            "rewritten_text": f"Improved: {request.original_text}",
            "why_this_is_better": "Adds clarity and stronger wording.",
            "added_keywords": [],
            "needs_user_verification": False,
        },
        {
            "version": 2,
            "rewritten_text": f"Enhanced version: {request.original_text}",
            "why_this_is_better": "Uses more professional resume wording.",
            "added_keywords": [],
            "needs_user_verification": False,
        },
    ]

    return {"suggestions": suggestions}