def is_weak_bullet(text: str):
    text_lower = text.lower()

    reasons = []

    # Rule 1: too short
    if len(text.split()) < 6:
        reasons.append("Too short and lacks detail.")

    # Rule 2: weak starting phrases
    weak_starts = ["worked on", "helped", "assisted", "did", "made"]
    if any(text_lower.startswith(ws) for ws in weak_starts):
        reasons.append("Uses weak action verb (e.g., 'worked on', 'helped').")

    # Rule 3: no numbers / metrics
    if not any(char.isdigit() for char in text):
        reasons.append("No measurable impact (numbers, %, scale, etc.).")

    return reasons


def evaluate_resume(resume_json: dict):
    weak_bullets = []

    for section in resume_json["sections"]:
        for entry in section["entries"]:
            for bullet in entry["bullets"]:
                reasons = is_weak_bullet(bullet["text"])

                if reasons:
                    weak_bullets.append({
                        "bullet_id": bullet["bullet_id"],
                        "reason": " ".join(reasons)
                    })

    # Simple category logic
    if len(weak_bullets) == 0:
        category = "상"
    elif len(weak_bullets) <= 2:
        category = "중"
    else:
        category = "하"

    return {
        "overall_category": category,
        "overall_reasoning": f"Detected {len(weak_bullets)} weak bullet(s) based on clarity, impact, and wording.",
        "weak_bullets": weak_bullets
    }