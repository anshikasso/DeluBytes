import pandas as pd
import json


def build_roles():
    job_skills = pd.read_csv("data/raw/job_skills.csv")
    postings = pd.read_csv("data/raw/postings.csv")

    id_to_title = {}
    if "job_id" in postings.columns and "title" in postings.columns:
        for _, row in postings.iterrows():
            id_to_title[row["job_id"]] = str(row["title"]).strip()

    roles = {}

    for _, row in job_skills.iterrows():
        job_id = row.get("job_id")
        skill = str(row.get("skill_name", "")).strip().lower()
        role = id_to_title.get(job_id)

        if role and skill:
            roles.setdefault(role, [])
            roles[role].append(skill)

    for r in roles:
        roles[r] = list(set(roles[r]))

    with open("data/roles.json", "w") as f:
        json.dump(roles, f, indent=2)

    print("roles.json created:", len(roles))


if __name__ == "__main__":
    build_roles()
