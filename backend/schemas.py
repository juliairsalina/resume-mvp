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