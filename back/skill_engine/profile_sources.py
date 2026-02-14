def linkedin_to_text(profile_json):
    about = profile_json.get("about", "")
    skills = " ".join(profile_json.get("skills", []))
    return about + " " + skills


def github_to_text(repo_json):
    readme = repo_json.get("readme", "")
    langs = " ".join(repo_json.get("languages", []))
    return readme + " " + langs
