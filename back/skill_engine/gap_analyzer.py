def calculate_gap(user_skills, role_skills):
    user_set = set(user_skills)
    role_set = set(role_skills)

    overlap = list(user_set & role_set)
    missing = list(role_set - user_set)

    percent = round(len(overlap) / len(role_set) * 100, 2) if role_set else 0

    return {
        "overlap_skills": overlap,
        "missing_skills": missing,
        "qualification_percent": percent
    }
