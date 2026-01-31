# ViyaStree — Hackathon Submission Guide

This document explains the **problem statement**, **system architecture**, **steps to execute the code**, and a **file-by-file description** of the ViyaStree application so you can clearly explain and justify the code during the live presentation.

---

## 1. Problem Statement

**Challenge:** Women often face gaps in (1) **skills** for employability, (2) **livelihood opportunities** that match their skills, and (3) **legal and safety awareness** (rights, workplace safety, digital safety).

**Our solution:** ViyaStree (शक्तिः, शिक्षा, समृद्धिः — Power, Education, Prosperity) is a web application that:

- **Shiksha** (शिक्षा — Education): Lets users discover courses, track progress with progress bars, and build a learning streak (gamification).
- **Samruddhih** (समृद्धिः — Prosperity): Shows job/opportunity cards with a **match percentage** based on user skills and lets users apply; applications are stored in the backend.
- **Shaktih** (शक्तिः — Power): Lets users ask legal-awareness questions and get educational answers from a knowledge base (educational only, not legal advice).

The app connects these three pillars in an **“Empowerment Loop”**: skills → livelihood → safety, with a backend that stores user progress, applications, and recommendations so the experience is persistent and personalized.

---

## 2. System Architecture / Approach

### High-level architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + Vite)                    │
│  Landing / Login / SignUp → Dashboard / Shiksha / Samruddhih     │
│  Shaktih | Context (user, API calls) | Progress bars              │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTP (REST API)
                                │ /api/v1/...
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js + Express)                   │
│  Routes: orchestration, shiksha, samruddhih, shaktih             │
│  Controllers → Models (Mongoose) → MongoDB                        │
│  Orchestrator: events (skill_completed, opportunity_saved, etc.) │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         MongoDB                                   │
│  Collections: Users, Courses, Opportunities, Events, KnowledgeBase │
└─────────────────────────────────────────────────────────────────┘
```

### Approach summary

| Layer        | Technology / approach |
|-------------|------------------------|
| Frontend    | React 18, React Router, Vite; no external UI library — custom CSS for layout, progress bars, cards. |
| State       | React Context (`DemoContext`) for user, notifications, and API helpers (completeCourse, applyToOpportunity, askLegalQuery). |
| Backend     | Express.js, Mongoose, MongoDB; REST API under `/api/v1`; CORS and Helmet for security. |
| Data        | User progress (course completion %, streak, safety score, applications) and recommendations computed from stored data. |
| Gamification| Progress bars (course %, safety score), learning streak, learner rank %, match % on opportunities. |

### API flow (how frontend and backend connect)

- **Dashboard:** Frontend calls `GET /api/v1/orchestration/dashboard?userId=...` → backend reads User from MongoDB → returns `skillsLearned`, `jobsApplied`, `rightsKnown`, `safetyScore`, `learningStreakDays`, `learnerRankPercent`, `recommendations`, `nextSteps`.
- **Courses:** Frontend calls `GET /api/v1/shiksha/courses?userId=...` → backend returns courses with `percentComplete` from user’s `progress.courseProgress`.
- **Update progress:** Frontend calls `POST /api/v1/shiksha/update-progress` with `userId`, `courseId`, `percentComplete` (and optionally `quizScore` for completion) → backend updates User and streak.
- **Opportunities:** Frontend calls `GET /api/v1/samruddhih/opportunities?userId=...` → backend computes `matchPercent` from user’s completed skills vs opportunity’s required skills → returns list with match %.
- **Apply:** Frontend calls `POST /api/v1/samruddhih/apply` with `userId`, `opportunityId` → backend appends to user’s `applications` array.
- **Legal query:** Frontend calls `POST /api/v1/shaktih/legal-query` with `query` → backend searches `KnowledgeBase` by keywords → returns educational content.

---

## 3. Steps to Execute the Code

### Prerequisites

- **Node.js** (v16 or later recommended)
- **MongoDB** (local installation or a cloud URI)

### Backend

1. Open a terminal and go to the backend folder:
   ```bash
   cd codeforher/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create environment file (optional; defaults work for local MongoDB):
   ```bash
   copy .env.example .env
   ```
   In `.env` you can set:
   - `MONGO_URI=mongodb://localhost:27017/viyastree` (or your MongoDB connection string)
   - `PORT=5000` (optional; default is 5000)
4. Seed the database (creates demo user, courses, opportunities, knowledge base):
   ```bash
   node scripts/seed_database.js
   ```
5. Start the server:
   ```bash
   npm start
   ```
   Server runs at **http://localhost:5000**. API is under **http://localhost:5000/api/v1/...**.

### Frontend

1. Open a **new** terminal and go to the frontend folder:
   ```bash
   cd codeforher/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the URL shown (e.g. **http://localhost:5173**) in a browser.
5. Use **Sign Up** or **Log In** (any name/email for demo). The frontend proxies `/api` to the backend when both are running (see `frontend/vite.config.js`).

### Verifying execution

- **Landing:** You see “VivaStree”, “Start Your Journey”, Log In / Sign Up.
- **After login:** Dashboard shows metrics (Skills Learned, Jobs Applied, Rights Known, Safety Score), Empowerment Loop cards, and Recommended for You.
- **Shiksha:** Shows learning streak, featured courses with progress bars; “Start Learning” / “Continue” update backend and refetch.
- **Samruddhih:** Shows opportunity cards with match %; “Apply Now” stores application in backend.
- **Shaktih:** Ask a question (e.g. “maternity leave”); answer comes from the knowledge base.

---

## 4. File-by-File Explanation of the Codebase

Use this section to explain **what each file does** during your presentation.

---

### Root level

| File / folder   | Purpose |
|-----------------|--------|
| `README.md`     | Project overview, quick start, what’s in the app, backend overview, demo flows. |
| `SUBMISSION_GUIDE.md` | This document: problem statement, architecture, execution steps, file explanations. |
| `.gitignore`    | Excludes `node_modules`, `.env`, build outputs, etc. |
| `data/`         | Static data used by the backend (e.g. seed or knowledge base). |

---

### Backend (`backend/`)

#### Entry and config

| File            | Purpose |
|-----------------|--------|
| `index.js`      | Express app entry. Connects to MongoDB, mounts CORS, Helmet, JSON body parser. Registers routes: `/api/v1/shaktih`, `/api/v1/shiksha`, `/api/v1/samruddhih`, `/api/v1/orchestration`. Starts server after DB connect. |
| `package.json`  | Backend dependencies (express, mongoose, cors, helmet, dotenv) and scripts: `start`, `dev`, `seed`. |
| `.env.example`  | Template for environment variables (e.g. `MONGO_URI`, `PORT`). |

#### Models (`backend/models/`)

| File            | Purpose |
|-----------------|--------|
| `User.js`       | Mongoose schema for User: `userId`, `profile`, `preferences`, `progress` (level, points, completed_skills, courseProgress, learningStreakDays, lastActiveDate, safetyScore, rightsKnownCount, learnerRankPercent), `saved_opportunities`, `applications` (array of { opportunityId, appliedAt, status }), timestamps. |
| `Course.js`     | Schema for Course: `courseId`, `title`, `skill`, `level`, `provider`, `duration`, `url`, `syllabus`, `quiz`, `estimatedCompletion`. |
| `Opportunity.js`| Schema for Opportunity: `opportunityId`, `title`, `organization`, `location`, `workType`, `requiredSkills`, `experienceLevel`, `salary`, `description`, `contactInfo`, `postedDate`, `isActive`. |
| `Event.js`      | Schema for orchestration events: `userId`, `eventType`, `data`, `module`, timestamps. |
| `KnowledgeBase.js` | Schema for legal-awareness content: `category`, `topic`, `keywords`, `content`, `relatedTopics`, `lastUpdated`. |

#### Routes (`backend/routes/`)

| File              | Purpose |
|-------------------|--------|
| `orchestration.js`| `GET /dashboard`: reads User, computes `skillsLearned`, `jobsApplied`, `rightsKnown`, `safetyScore`, `learningStreakDays`, `learnerRankPercent`, builds `recommendations` and `nextSteps`, returns JSON. |
| `shiksha.js`      | `GET /courses` → list courses with user’s `percentComplete`; `GET /course/:courseId` → one course + progress; `POST /update-progress` → update courseProgress, streak, optional completion; `POST /generate-path` (stub). |
| `samruddhih.js`   | `GET /opportunities` → list opportunities with `matchPercent`; `POST /save-opportunity`; `POST /apply` → add to user’s applications; `POST /match-opportunities` (body). |
| `shaktih.js`      | `POST /legal-query` → keyword search in KnowledgeBase, return educational content; `GET /lesson/:lessonId` (stub). |

#### Controllers (`backend/controllers/`)

| File                    | Purpose |
|-------------------------|--------|
| `shikshaController.js`   | `listCourses`: fetch courses, merge user’s `progress.courseProgress` for percentComplete. `updateProgress`: update User’s courseProgress, optional completion and points, update streak (lastActiveDate, learningStreakDays). Emit `skill_completed` when course completed. `getCourse`, `generatePath` (stub). |
| `samruddhihController.js` | `listOpportunities`: fetch opportunities, compute `matchPercent` from user’s completed_skills vs requiredSkills. `saveOpportunity`: add to user’s saved_opportunities, emit `opportunity_saved`. `applyToOpportunity`: add to user’s applications. `matchOpportunities`: same match logic, returns list. |
| `shaktihController.js`  | `handleLegalQuery`: split query into keywords, find KnowledgeBase doc with matching keywords, return content; fallback message with helpline. `getLesson` (stub). |

#### Orchestrator and seed

| File                | Purpose |
|---------------------|--------|
| `orchestrator.js`   | Class with `emitEvent(eventName, userId, data)`: persist event in Event model, then run handler. Handlers: `skill_completed` (e.g. log when user has 3+ skills), `opportunity_saved` (e.g. suggest safety when first saved), `safety_module_completed` (e.g. award points). |
| `scripts/seed_database.js` | Connects to MongoDB; seeds KnowledgeBase from `data/knowledge_base.json`; seeds Courses and Opportunities; creates demo User “Palak” with progress (e.g. streak 12, safetyScore 98, courseProgress for one course). |

---

### Data (`data/`)

| File                  | Purpose |
|-----------------------|--------|
| `knowledge_base.json` | Array of legal-awareness entries: `category`, `topic`, `keywords`, `content` (summary, keyPoints, lawReference), `relatedTopics`. Used by seed and by Shaktih legal-query search. |

---

### Frontend (`frontend/`)

#### Entry and config

| File            | Purpose |
|-----------------|--------|
| `index.html`    | Single HTML page; root div and script to `src/main.jsx`. |
| `main.jsx`      | Renders app into root: `BrowserRouter` → `DemoProvider` → `App`; imports `styles.css`. |
| `package.json`  | Dependencies: react, react-dom, react-router-dom; dev: vite. Scripts: dev, build, preview. |
| `vite.config.js`| Vite config; proxy `/api` to `http://localhost:5000` so frontend can call backend without CORS issues. |

#### App and routing

| File     | Purpose |
|----------|--------|
| `App.jsx`| Top-level routes: `/` → Landing (or redirect to dashboard if logged in); `/login`, `/signup`; `/dashboard`, `/shiksha`, `/samruddhih`, `/shaktih` wrapped in `ProtectedRoute` (requires login, then wraps page in `Layout`). Renders global `Notifications` from context. |

#### Context

| File              | Purpose |
|-------------------|--------|
| `DemoContext.jsx` | React Context: holds `user` (from localStorage if present), `dashboard`, `notifications`. Provides `login`, `signup`, `logout` (sets/clears user and localStorage). API helpers: `completeCourse` (POST update-progress, update local user progress/streak), `saveOpportunity`, `applyToOpportunity` (POST apply, update user.applications), `askLegalQuery`. Push notifications for success/errors. |

#### Layout and shared components

| File           | Purpose |
|----------------|--------|
| `Layout.jsx`   | App shell when logged in: sidebar “EMPOWERMENT LOOP” with links (Dashboard, Samruddhih, Shiksha, Shaktih), Safety card + SOS button; top header with logo, notification icon, user avatar/name, Log out. Renders `children` (page content) in main area. |
| `Header.jsx`   | (Legacy/topbar header; Layout is the main shell now.) |
| `Button.jsx`   | Reusable button component; used where needed for consistency and accessibility. |
| `Icon.jsx`     | SVG icons: Bell, User, House, Briefcase, GraduationCap, Scale, Shield, ArrowRight, BarChart, Folder, Search, ChevronUp. Used in Layout, Dashboard, Shiksha, Samruddhih. |
| `ProgressBar.jsx` | Reusable progress bar: `percent`, optional `label`, `showLabel`; `role="progressbar"` and `aria-valuenow` for accessibility. Used for course completion and Safety Score. |

#### Pages

| File           | Purpose |
|----------------|--------|
| `Landing.jsx`  | Public landing: logo, “VivaStree”, Devanagari tagline, mission text, “Start Your Journey” (→ signup), “Existing Member?” (→ login), Log In / Sign Up in header. |
| `Login.jsx`    | Login form: email, password; submit calls `login()` from context and navigates to dashboard. Links to Sign up and Back to Home. |
| `SignUp.jsx`   | Create account: full name, email, password; submit calls `signup()` and navigates to dashboard. Links to Log in and Back to Home. |
| `Dashboard.jsx`| Fetches `GET /api/v1/orchestration/dashboard`, then shows: greeting “Namaste, {name}”, status badge, four metric cards (Skills Learned, Jobs Applied, Rights Known, Safety Score with progress bar), “Your Empowerment Loop” (Shiksha, Samruddhih, Shaktih cards with Explore), “Recommended for You” list. |
| `Shiksha.jsx`  | Shiksha page: fetches `GET /api/v1/shiksha/courses`. Shows “Your Learning Streak” (days active, learner rank %), “Featured Courses” grid: each course has progress bar, “Not Started” / “X% Complete”, “Start Learning” / “Continue”. Start/Continue calls `completeCourse` with percentComplete then refetches courses. |
| `Samruddhih.jsx` | Samruddhih page: fetches `GET /api/v1/samruddhih/opportunities`. Search filter, “View My Applications”. Opportunity cards: avatar, title, match %, location/type, skill tags, salary, “Apply Now” (calls `applyToOpportunity`; button becomes “Applied” if already applied). |
| `Shaktih.jsx`  | Shaktih page: input for legal question; submit calls `askLegalQuery` (POST legal-query); displays response (educational content or fallback). |

#### Styles

| File        | Purpose |
|-------------|--------|
| `styles.css`| Global and component-level CSS: variables (colors, radii, shadows), layout (landing, auth, app layout, sidebar, header), progress bar, dashboard metrics and cards, Shiksha streak and course cards, Samruddhih opportunity cards, buttons, notifications, accessibility (skip link, focus). |

---

## 5. How to Explain This in a Presentation

1. **Problem:** Briefly state the gap in skills, livelihood, and legal/safety awareness for women; say ViyaStree ties these three into one loop.
2. **Architecture:** Show the diagram (frontend → API → backend → MongoDB). Mention React + Vite on frontend, Express + Mongoose on backend, REST under `/api/v1`.
3. **Flow:** Walk one path: e.g. “User opens Shiksha → frontend calls GET courses → backend returns courses with percentComplete from User model → user clicks Continue → POST update-progress → backend updates courseProgress and streak → frontend refetches courses.”
4. **Gamification:** Point to progress bars (course %, safety score), learning streak, learner rank %, and match % on opportunities; say these are computed or stored in the backend and displayed in the UI.
5. **Files:** Use the file-by-file table to answer “what does X do?” — e.g. “`orchestration.js` serves the dashboard API; `DemoContext.jsx` holds user state and the functions that call the backend.”
6. **Execution:** Run backend seed and start, then frontend dev; show Landing → Sign Up → Dashboard → Shiksha (progress) → Samruddhih (apply).

---

## 6. AI Tools Usage (Hackathon Compliance)

In line with the **IEEE RGIPT SB Hackathon AI Usage Policy**, we confirm the following:

### How AI tools were used (only where necessary)

- **Reference and learning:** AI tools were used only for reference or to learn concepts (e.g. React Context usage, Mongoose schema options, Express route patterns). No complete solutions were copy-pasted.
- **Documentation:** AI was used to help structure and clarify this submission guide (problem statement, architecture, file explanations). The content was reviewed and adapted by the team to match our actual codebase.
- **Debugging and syntax:** Where necessary, AI was used for hints on errors or syntax (e.g. dependency arrays, API response handling). Logic and design decisions are our own.
- **No full generation:** The application (backend and frontend), data models, API design, and UI flow were designed and implemented by the team. AI was not used to generate complete modules or full solutions.

### Our commitment

- **No direct copy-paste** of AI-generated code as a complete solution.
- **We can explain and justify our code** during the live presentation: every file and flow described in this guide is something we understand and can walk through.
- This submission is **not** fully AI-generated; it is our original work, with AI used only for reference or learning where necessary.

If you have questions about any part of the codebase during evaluation, we are prepared to explain it in detail.

---

*End of submission guide.*
