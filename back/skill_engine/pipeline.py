from skill_extractor import extract_skills
from role_loader import load_roles
from gap_analyzer import calculate_gap
from roadmap_logic import roadmap_level


# ---------- CORE ANALYSIS ----------
def analyze_text(text, role):
    skills = extract_skills(text)

    roles = load_roles()
    role_skills = roles.get(role, [])

    gap = calculate_gap(skills, role_skills)

    level = roadmap_level(gap["qualification_percent"])

    return {
        "role": role,
        "user_skills": skills,
        "missing_skills": gap["missing_skills"],
        "percent": gap["qualification_percent"],
        "roadmap_level": level
    }


# ---------- AGENT STATE ----------
class SkillPilotAgent:
    def __init__(self, role):
        self.role = role
        self.history = []
        self.state = {}

    def perceive(self, text):
        """Read user profile"""
        self.current_text = text

    def reason(self):
        """Analyze skills + gap"""
        result = analyze_text(self.current_text, self.role)
        self.state = result
        self.history.append(result)

    def plan(self):
        """Decide roadmap stage"""
        percent = self.state["percent"]

        if percent < 40:
            plan = "Focus on fundamentals and core tools"
        elif percent < 70:
            plan = "Build intermediate projects and specialization"
        else:
            plan = "Advanced portfolio and real-world deployment"

        self.state["agent_plan"] = plan

    def act(self):
        """Return agent output"""
        return self.state

    def run(self, text):
        """Full agent cycle"""
        self.perceive(text)
        self.reason()
        self.plan()
        return self.act()


# ---------- TEST ----------
if __name__ == "__main__":
    sample = "Python SQL machine learning teamwork leadership"

    agent = SkillPilotAgent("Data Scientist")
    result = agent.run(sample)

    print(result)
