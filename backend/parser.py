def build_mock_resume_json():
    return {
        "sections": [
            {
                "section_id": "header",
                "section_name": "Header",
                "entries": [
                    {
                        "entry_id": "header1",
                        "title": "Julia Irsalina Binti Mohamad Sani",
                        "organization": "B.S. Candidate in Data Science, Korea University",
                        "bullets": [
                            {
                                "bullet_id": "h1",
                                "text": "LinkedIn: linkedin.com/in/julia-irsalina"
                            },
                            {
                                "bullet_id": "h2",
                                "text": "Email: juliairsalinasani@gmail.com"
                            },
                            {
                                "bullet_id": "h3",
                                "text": "Based in: Malaysia | Seoul, South Korea"
                            }
                        ]
                    }
                ]
            },
            {
                "section_id": "education",
                "section_name": "Education",
                "entries": [
                    {
                        "entry_id": "edu1",
                        "title": "Korea University",
                        "organization": "B.S. in Data Science; CGPA: 3.86/4.50",
                        "bullets": [
                            {
                                "bullet_id": "edu_b1",
                                "text": "Expected graduation: Feb 2027"
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
                        "title": "Scalable Weakly Supervised Product Classification",
                        "organization": "Big Data Analytics, Korea University",
                        "bullets": [
                            {
                                "bullet_id": "p1_b1",
                                "text": "Built a hierarchical multi-label classification system using BERT and Graph Attention for a 531-class taxonomy under weak supervision."
                            },
                            {
                                "bullet_id": "p1_b2",
                                "text": "Improved F1 from 0.005 to 0.246 and reduced hierarchy violation rate from 0.64 to 0.14."
                            }
                        ]
                    },
                    {
                        "entry_id": "proj2",
                        "title": "Stress Detection – Dual-Branch VAE-LSTM",
                        "organization": "Advanced Machine Learning, Korea University",
                        "bullets": [
                            {
                                "bullet_id": "p2_b1",
                                "text": "Developed an unsupervised dual-branch VAE-LSTM on WESAD signals."
                            },
                            {
                                "bullet_id": "p2_b2",
                                "text": "Reduced model parameters by 77% while enabling real-time inference under 50ms."
                            }
                        ]
                    }
                ]
            },
            {
                "section_id": "skills",
                "section_name": "Skills",
                "entries": [
                    {
                        "entry_id": "skills1",
                        "title": "Technical Skills",
                        "organization": "",
                        "bullets": [
                            {
                                "bullet_id": "s1",
                                "text": "Programming: C, Python, R, SQL"
                            },
                            {
                                "bullet_id": "s2",
                                "text": "Machine Learning: Weak Supervision, Time-Series Modeling, CNNs, VAEs, LSTMs, Transformers"
                            },
                            {
                                "bullet_id": "s3",
                                "text": "Cloud & Tools: AWS SageMaker, Azure, Colab, VS Code"
                            }
                        ]
                    }
                ]
            }
        ]
    }