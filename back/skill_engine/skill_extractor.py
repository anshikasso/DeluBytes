import pandas as pd
import os

_script_dir = os.path.dirname(os.path.abspath(__file__))
_data_path = os.path.join(_script_dir, "data", "skills_dataset.csv")

# Common tech skills for fallback / enrichment
COMMON_SKILLS = {
    "python", "javascript", "java", "typescript", "sql", "react", "node.js",
    "html", "css", "git", "docker", "mongodb", "postgresql", "mysql", "aws",
    "machine learning", "data analysis", "pandas", "numpy", "scikit-learn",
    "tensorflow", "pytorch", "django", "flask", "express", "vue", "angular",
    "rest apis", "kubernetes", "terraform", "linux", "agile", "communication",
    "problem solving", "team collaboration", "project management",
}

try:
    df = pd.read_csv(_data_path)
    csv_skills = set(s for s in df["skill"].astype(str) if 1 < len(s) < 60)
    MASTER_SKILLS = COMMON_SKILLS | csv_skills
except Exception:
    MASTER_SKILLS = COMMON_SKILLS


def extract_skills(text):
    text = text.lower()
    found = []

    for skill in MASTER_SKILLS:
        if skill in text:
            found.append(skill)

    return list(set(found))
