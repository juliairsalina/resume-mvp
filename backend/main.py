from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.schemas import MockAnalysisResponse

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

@app.get("/mock-analysis")
def mock_analysis():
    return {
        "resume_json": {
            "sections": [
                {
                    "section_id": "experience",
                    "section_name": "Experience",
                    "entries": [
                        {
                            "entry_id": "exp1",
                            "title": "Data Intern",
                            "organization": "ABC Company",
                            "bullets": [
                                {
                                    "bullet_id": "b1",
                                    "text": "Worked on sales data analysis."
                                },
                                {
                                    "bullet_id": "b2",
                                    "text": "Created weekly reports for the team."
                                }
                            ]
                        }
                    ]
                },
                {
                    "section_id": "projects",
                    "section_name": "Projects",
                    "entries": [
                        {
                            "entry_id": "proj1",
                            "title": "Customer Churn Analysis",
                            "organization": "University Project",
                            "bullets": [
                                {
                                    "bullet_id": "b3",
                                    "text": "Built a machine learning model to predict churn."
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "benchmark": {
            "overall_category": "중",
            "overall_reasoning": "The resume shows relevant work and project experience, but several bullets are too generic and lack measurable impact.",
            "weak_bullets": [
                {
                    "bullet_id": "b1",
                    "reason": "Too vague and lacks tools, methods, or measurable results."
                },
                {
                    "bullet_id": "b2",
                    "reason": "Describes a task but not the outcome or value."
                }
            ]
        }
    }