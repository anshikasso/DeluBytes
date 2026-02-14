import pandas as pd


def build_master_skills():
    skills = set()

    # job_skills.csv
    job_skills = pd.read_csv("data/raw/job_skills.csv")
    if "skill_name" in job_skills.columns:
        for s in job_skills["skill_name"].dropna():
            skills.add(str(s).strip().lower())

    # gpt_dataset.csv
    gpt = pd.read_csv("data/raw/gpt_dataset.csv")
    for col in gpt.columns:
        for s in gpt[col].dropna():
            skills.add(str(s).strip().lower())

    df = pd.DataFrame({"skill": sorted(skills)})
    df.to_csv("data/skills_dataset.csv", index=False)

    print("skills_dataset.csv created:", len(df))


if __name__ == "__main__":
    build_master_skills()
