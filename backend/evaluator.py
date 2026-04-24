def build_mock_benchmark_result():
    return {
        "overall_category": "중",
        "overall_reasoning": (
            "The resume shows relevant work and project experience, "
            "but several bullets are too generic and lack measurable impact."
        ),
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
