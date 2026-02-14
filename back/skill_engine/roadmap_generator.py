"""Generate 30-day roadmap milestones from gap analysis."""

ROADMAP_TEMPLATES = {
    "beginner": [
        {"title": "Set up your development environment", "description": "Install essential tools: IDE, Git, and language runtime.", "days": 1},
        {"title": "Complete fundamentals course", "description": "Finish core language/framework basics (variables, functions, data structures).", "days": 5},
        {"title": "Build a small practice project", "description": "Create a simple app (e.g., todo list or calculator) to apply basics.", "days": 10},
        {"title": "Learn version control basics", "description": "Practice Git: commit, push, pull, branching.", "days": 12},
        {"title": "Explore one key framework", "description": "Get comfortable with the main framework for your target role.", "days": 18},
        {"title": "Build a portfolio project", "description": "Complete one substantial project to showcase on GitHub.", "days": 25},
        {"title": "Prepare your resume", "description": "Update resume with projects and skills; get feedback.", "days": 28},
        {"title": "Apply to 3+ roles", "description": "Submit tailored applications to entry-level positions.", "days": 30},
    ],
    "intermediate": [
        {"title": "Review and strengthen weak areas", "description": "Focus on gaps: complete targeted tutorials or courses.", "days": 3},
        {"title": "Build an intermediate project", "description": "Create a project with API integration, auth, or database.", "days": 8},
        {"title": "Contribute to open source", "description": "Find a beginner-friendly repo and submit your first PR.", "days": 15},
        {"title": "Deepen framework expertise", "description": "Learn advanced patterns (state management, testing, performance).", "days": 20},
        {"title": "Create 2-3 portfolio pieces", "description": "Document projects with README, demos, and clean code.", "days": 25},
        {"title": "Prepare for interviews", "description": "Practice problem-solving and behavioral questions.", "days": 28},
        {"title": "Apply to 5+ roles", "description": "Send tailored applications with cover letters.", "days": 30},
    ],
    "advanced": [
        {"title": "Address remaining gaps", "description": "Quick review of any missing skills; build a small proof-of-concept.", "days": 5},
        {"title": "Build or refine a standout project", "description": "Polish a complex project with deployment and documentation.", "days": 12},
        {"title": "Contribute meaningfully to OSS", "description": "Submit PRs or document contributions to notable projects.", "days": 18},
        {"title": "Sharpen system design skills", "description": "Practice architecture and scalability discussions.", "days": 22},
        {"title": "Network and reach out", "description": "Connect with recruiters and engineers; request referrals.", "days": 26},
        {"title": "Apply to 10+ roles", "description": "Target mid/senior positions; tailor each application.", "days": 30},
    ],
}


def generate_roadmap(missing_skills, roadmap_level, role="Developer"):
    """Generate 30-day milestones based on gap analysis."""
    template = ROADMAP_TEMPLATES.get(roadmap_level, ROADMAP_TEMPLATES["beginner"])
    milestones = []

    # Add 1-2 skill-specific tasks if we have missing skills
    if missing_skills and len(missing_skills) > 0:
        top_missing = missing_skills[:3]
        skills_str = ", ".join(top_missing[:2])
        milestones.append({
            "title": f"Learn key missing skills: {skills_str}",
            "description": "Complete focused tutorials or small projects for these competencies.",
            "days": 7 if roadmap_level == "beginner" else 5,
        })

    for m in template:
        milestones.append({
            "title": m["title"],
            "description": m["description"],
            "days": m["days"],
        })

    # Re-sort by days and re-number
    milestones.sort(key=lambda x: x["days"])
    for i, m in enumerate(milestones):
        m["id"] = i + 1

    return milestones[:10]  # Cap at 10 milestones
