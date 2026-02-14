# Personal Career Navigator

Your AI-powered Career Co-Pilot — An AI agents / Career Tech / EdTech dashboard that helps students navigate their professional growth.

## Features

- **Resume Upload** — Drag & drop or browse to upload your resume (PDF)
- **Profile Links** — Optional GitHub and LinkedIn profile URLs
- **Skill Analysis** — AI-extracted skills across categories (Skills, Languages, Tools, Frameworks, Extracurricular)
- **30-Day Roadmap** — Personalized learning path with milestones and motivational signs
- **Light/Dark Theme** — Animated toggle with modern aesthetics
- **Responsive Design** — Mobile-first, works on all screen sizes

## Tech Stack

**Frontend:** React 19 + Vite, TailwindCSS v4, Framer Motion, Lucide React

**Backend:** Python FastAPI, pandas, skill extraction from `skills_dataset.csv`, role-based gap analysis from `roles.json`

## Getting Started

### 1. Frontend

```bash
# Install dependencies
npm install

# Start development server (proxies /api to backend)
npm run dev

# Build for production
npm run build
```

### 2. Backend (required for resume analysis)

```bash
cd back
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

The frontend proxies `/api/*` to `http://localhost:8000` when running `npm run dev`.

### 3. Full stack

1. Start the backend: `cd back && python -m uvicorn main:app --reload --port 8000`
2. Start the frontend: `npm run dev`
3. Open http://localhost:5173

## Design

- **Theme**: Modern Soft Minimalism — Neo-Brutalist meets Soft UI
- **Colors**: Lavender → peach gradient, burnt orange accent (#F97316), mint highlights (#34D399)
- **Effects**: Glassmorphism cards, soft shadows, smooth micro-interactions

## Project Structure

```
back/
├── main.py              # FastAPI app, /api/analyze, /api/roles
├── requirements.txt
└── skill_engine/
    ├── pipeline.py      # SkillPilotAgent, analyze_text
    ├── skill_extractor.py
    ├── gap_analyzer.py
    ├── roadmap_logic.py
    ├── roadmap_generator.py
    └── data/
        ├── roles.json       # Role → required skills
        └── skills_dataset.csv

src/
├── components/
│   ├── Navbar.jsx
│   ├── HeroSection.jsx
│   ├── ResumeUpload.jsx
│   ├── ProfileLinks.jsx
│   ├── SkillsSection.jsx
│   ├── SkillTag.jsx
│   ├── RoadmapSection.jsx
│   ├── RoadMilestone.jsx
│   ├── MotivationSign.jsx
│   ├── ConfettiBurst.jsx
│   └── Footer.jsx
├── context/
│   └── ThemeContext.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## License

MIT
