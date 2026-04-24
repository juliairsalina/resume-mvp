def build_mock_resume_json():
    return {
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
    }