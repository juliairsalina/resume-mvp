from typing import List, Optional
from pydantic import BaseModel


class Bullet(BaseModel):
    bullet_id: str
    text: str


class ResumeEntry(BaseModel):
    entry_id: str
    title: str
    organization: Optional[str] = None
    bullets: List[Bullet]


class ResumeSection(BaseModel):
    section_id: str
    section_name: str
    entries: List[ResumeEntry]


class ResumeJSON(BaseModel):
    sections: List[ResumeSection]


class WeakBullet(BaseModel):
    bullet_id: str
    reason: str


class BenchmarkResult(BaseModel):
    overall_category: str
    overall_reasoning: str
    weak_bullets: List[WeakBullet]


class MockAnalysisResponse(BaseModel):
    resume_json: ResumeJSON
    benchmark: BenchmarkResult


class AnalyzeResumeRequest(BaseModel):
    target_role: str
    target_level: str


class RewriteRequest(BaseModel):
    target_role: str
    target_level: str
    bullet_id: str
    original_text: str
    weakness_reason: str
    missing_keywords: List[str] = []


class RewriteSuggestion(BaseModel):
    version: int
    rewritten_text: str
    why_this_is_better: str
    added_keywords: List[str] = []
    needs_user_verification: bool = False


class RewriteResponse(BaseModel):
    suggestions: List[RewriteSuggestion]


class ReevaluateRequest(BaseModel):
    target_role: str
    target_level: str
    resume_json: ResumeJSON


class ReevaluateResponse(BaseModel):
    benchmark: BenchmarkResult