# ViyaStree: शक्तिः, शिक्षा, समृद्धिः

**Power, Education, Prosperity** — Empowering women everywhere through a holistic loop of Shaktih, Shiksha, and Samruddhih.

ViyaStree is a web app that connects skill development (Shiksha), livelihood opportunities (Samruddhih), and legal & safety awareness (Shaktih) with progress tracking, gamification, and a backend that stores user progress and recommendations.

**For hackathon submission:** Problem statement, system architecture, steps to execute, and a **file-by-file code explanation** (for presentation and evaluation) are in **[SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md)**.

---

## Quick start — Backend

1. Ensure MongoDB is running (local or set `MONGO_URI` in `.env`).
2. From the project root:

```powershell
cd codeforher/backend
npm install
copy .env.example .env
node scripts/seed_database.js
npm start
```

The backend runs on **http://localhost:5000** and serves APIs under `/api/v1`.

---

## Quick start — Frontend

1. In a new terminal:

```powershell
cd codeforher/frontend
npm install
npm run dev
```

2. Open the URL shown (e.g. **http://localhost:5173**).  
3. Use **Sign Up** or **Log In** (any name/email for demo) to enter the app.

The frontend proxies `/api` to the backend when both are running.

---

## What’s in the app

- **Landing** — ViyaStree branding, “Start Your Journey”, Log In / Sign Up.
- **Auth** — Create Account (Full Name, Email, Password) and Log In; demo mode (no real auth).
- **Dashboard** — Greeting, “Current Status: Active Learner”, metrics (Skills Learned, Jobs Applied, Rights Known, Safety Score with **progress bar**), “Your Empowerment Loop” cards (Shiksha, Samruddhih, Shaktih), and “Recommended for You” from the backend.
- **Shiksha** (शिक्षा — Education) — **Learning streak** (Days Active, Top X% of Learners), **Featured courses** with **progress bars** (Not Started / X% Complete), Start Learning / Continue (persisted via API).
- **Samruddhih** (समृद्धिः — Prosperity) — Search, **opportunity cards** with **match %** (skill fit), Apply Now (stored in backend), View My Applications.
- **Shaktih** (शक्तिः — Power) — Ask legal questions; answers from the knowledge base (educational only).

**Gamification & progress**

- Progress bars for course completion and Safety Score.
- Learning streak (days active) and learner rank (Top X%).
- Match percentage on each opportunity card.
- Status badge and recommendations driven by backend data.

---

## Backend overview

- **Models:** User (profile, progress, `courseProgress`, `learningStreakDays`, `safetyScore`, `applications`), Course, Opportunity, Event, KnowledgeBase.
- **APIs:**
  - `GET /api/v1/orchestration/dashboard?userId=...` — metrics, recommendations, next steps.
  - `GET /api/v1/shiksha/courses?userId=...` — courses with user `percentComplete`.
  - `POST /api/v1/shiksha/update-progress` — update course progress and streak.
  - `GET /api/v1/samruddhih/opportunities?userId=...` — opportunities with `matchPercent`.
  - `POST /api/v1/samruddhih/apply` — record job application.
- **Seed:** Demo user “Palak”, sample courses, opportunities, and knowledge base.

---

## Demo flows

- **Skill completion** → backend updates `courseProgress` and streak → orchestrator can trigger opportunity matching.
- **Save / Apply opportunity** → stored in user → orchestrator can suggest safety lessons.
- **Legal query** → keyword match against `knowledge_base` → educational snippet (not legal advice).

---

## Files of interest

| Area        | Paths |
|------------|--------|
| Backend    | `backend/index.js`, `backend/orchestrator.js`, `backend/models/*`, `backend/controllers/*`, `backend/routes/*`, `backend/scripts/seed_database.js` |
| Frontend   | `frontend/src/App.jsx`, `frontend/src/context/DemoContext.jsx`, `frontend/src/components/*`, `frontend/src/pages/*` |
| Data       | `data/knowledge_base.json` |

---

## Notes

- Demo mode uses a single user id (`demo_user`); sign up / log in set local state and use the same backend user for simplicity.
- Legal content is for education only and is not legal advice.
- To change demo data, edit `backend/scripts/seed_database.js` and `data/knowledge_base.json`.

---

For questions or to extend the project, open an issue or contact the project owner.
