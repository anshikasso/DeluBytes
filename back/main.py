"""FastAPI backend for Personal Career Navigator."""

import sys
import os

# Add skill_engine to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "skill_engine"))
os.chdir(os.path.join(os.path.dirname(__file__), "skill_engine"))

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io

from pipeline import SkillPilotAgent
from roadmap_generator import generate_roadmap

app = FastAPI(title="Personal Career Navigator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def categorize_skills(skills_list):
    """Group skills into categories for display."""
    categories = {
        "Skills": [],
        "Languages": [],
        "Tools": [],
        "Frameworks": [],
        "Extracurricular": [],
    }
    # Simple heuristic mapping
    lang = {"python", "javascript", "typescript", "java", "kotlin", "swift", "sql", "r", "go", "c++", "c#", "html", "css"}
    tools = {"git", "docker", "kubernetes", "jenkins", "figma", "jira", "postman", "vs code", "aws", "azure", "terraform"}
    frameworks = {"react", "vue", "angular", "django", "flask", "express", "node.js", "spring boot", "tensorflow", "pytorch", "fastapi"}

    for s in skills_list:
        s_lower = s.lower()
        if s_lower in lang:
            categories["Languages"].append(s)
        elif s_lower in tools:
            categories["Tools"].append(s)
        elif s_lower in frameworks:
            categories["Frameworks"].append(s)
        elif any(x in s_lower for x in ["communication", "team", "leadership", "problem", "project"]):
            categories["Skills"].append(s)
        else:
            categories["Skills"].append(s)

    return {k: v for k, v in categories.items() if v}


@app.get("/api/health")
def health():
    return {"status": "ok", "message": "Career Navigator API"}


@app.get("/api/roles")
def get_roles():
    """List available dream roles."""
    from role_loader import load_roles
    roles = load_roles()
    return {"roles": list(roles.keys())}


@app.post("/api/analyze")
async def analyze_profile(
    resume_file: UploadFile | None = File(None),
    resume_text: str | None = Form(None),
    github_url: str | None = Form(None),
    linkedin_url: str | None = Form(None),
    role: str = Form("Full Stack Developer"),
):
    """
    Analyze resume + optional profile URLs.
    Accepts either resume_file (PDF) or resume_text.
    """
    text_parts = []

    if resume_file and resume_file.filename:
        if not resume_file.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are supported")
        content = await resume_file.read()
        try:
            reader = PdfReader(io.BytesIO(content))
            for page in reader.pages:
                text_parts.append(page.extract_text() or "")
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Could not read PDF: {str(e)}")

    if resume_text:
        text_parts.append(resume_text)

    if not text_parts:
        raise HTTPException(status_code=400, detail="Provide either resume file or resume text")

    combined_text = " ".join(text_parts)

    # Optional: append placeholder for GitHub/LinkedIn (actual fetching would need APIs)
    if github_url:
        combined_text += " github "
    if linkedin_url:
        combined_text += " linkedin "

    from role_loader import load_roles
    roles = load_roles()
    if role not in roles:
        role = list(roles.keys())[0] if roles else "Full Stack Developer"

    agent = SkillPilotAgent(role)
    result = agent.run(combined_text)

    skills_categorized = categorize_skills(result.get("user_skills", []))
    missing = result.get("missing_skills", [])
    roadmap = generate_roadmap(
        missing_skills=missing,
        roadmap_level=result.get("roadmap_level", "beginner"),
        role=role,
    )

    return {
        "role": role,
        "user_skills": result.get("user_skills", []),
        "skills_categorized": skills_categorized,
        "missing_skills": missing,
        "qualification_percent": result.get("percent", 0),
        "roadmap_level": result.get("roadmap_level", "beginner"),
        "agent_plan": result.get("agent_plan", ""),
        "roadmap": roadmap,
    }
