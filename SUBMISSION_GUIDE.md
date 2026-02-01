# ViyaStree — Hackathon Submission Guide

This document explains the **problem statement**, **system architecture**, **steps to execute the code**, and a **file-by-file description** of the ViyaStree application so you can clearly explain and justify the code during the live presentation.

---

## 1. Problem Statement

**Challenge:** Women in India often face significant gaps in:
1. **Employment-ready Skills**: Lack of access to structured, local-language vocational training.
2. **Economic Opportunity**: Difficulty finding flexible, home-based, or community-integrated livelihood.
3. **Safety & Legal Awareness**: Lack of immediate, context-specific access to emergency helplines and legal support in high-stress situations.

**Our solution:** ViyaStree (शक्तिः, शिक्षा, समृद्धिः — Power, Education, Prosperity) is a premium digital ecosystem that:

- **Shaktih** (शक्तिः — Power): Provides a **"One Action per Screen"** emergency UX with direct access to Indian helplines (**112, 1091, 181**) and localized help center lookups.
- **Shiksha** (शिक्षा — Education): Delivers skill-based courses and connects users with verified mentors and Govt helplines (**Kiran, Tele-MANAS**).
- **Samruddhih** (समृद्धिः — Prosperity): Matches users with home-based, digital, or local community jobs based on their evolving skills.

---

## 2. System Architecture / Approach

### High-level architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + Vite)                    │
│  Landing / Quick Actions → Dashboard / Shiksha / Samruddhih      │
│  Bilingual Engine (EN/HI) | Premium Indian-Inspired Design        │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTP (REST API)
                                │ /api/v1/...
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js + Express)                   │
│  Routes: shaktih, shiksha, samruddhih, orchestration             │
│  Controllers: SOS Handler, Mentor List, Opportunity Matcher       │
│  Orchestrator: Cross-module event triggers                       │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         MongoDB                                   │
│  Collections: Users, Courses, Opportunities, Mentors, HelpCenters │
└─────────────────────────────────────────────────────────────────┘
```

### Approach summary

| Layer        | Technology / approach |
|-------------|------------------------|
| Frontend    | React 18, Vite; Premium aesthetics (Playfair Display/Mukta); Custom CSS for all components. |
| State       | Context API for global user metrics, language preference, and notification dispatch. |
| Backend     | Express.js, Mongoose; Modular route structure; Optional DB connection with JSON fallbacks. |
| Design      | **Emergency UX**: High-contrast, localized emergency buttons; **Bilingual**: Seamless EN/HI switching. |
| Gamification| Progress bars, learning streaks, and skill-match percentages on job cards. |

---

## 3. Steps to Execute the Code

### Backend
1. Go to `backend/`.
2. `npm install`
3. `npm start` (Starts at http://localhost:5000).

### Frontend
1. Go to `frontend/`.
2. `npm install`
3. `npm run dev` (Starts at http://localhost:5173).

---

## 4. File-by-File Explanation

### Backend (`backend/`)
- `index.js`: App entry; configures security (Helmet, CORS) and registers module routes.
- `controllers/shaktihController.js`: Handles SOS alerts and localized help center retrieval.
- `controllers/shikshaController.js`: Manages courses, progress tracking, and mentor listings.
- `controllers/samruddhihController.js`: Intelligent job matching and application processing.
- `models/HelpCenter.js` & `models/Mentor.js`: New schemas for localized resources.

### Frontend (`frontend/src/`)
- `pages/Landing.jsx`: Premium home with Quick Actions (SOS, Nearby Help, Mentors, Jobs).
- `components/Modal.jsx`: Versatile interactive layer for service exploration and emergency views.
- `translations.js`: The heart of the bilingual experience; contains all strings in English and Hindi.
- `context/DemoContext.jsx`: Manages API interaction and user empowerment state.

---

## 5. How to Explain This in a Presentation

1. **The Vision**: Start with the Devanagari tagline: "Shaktih, Shiksha, Samruddhih". Explain that safety and education are prerequisites for prosperity.
2. **The Landing Page**: Show the "Quick Actions". Demonstrate triggering an **SOS Alert** and point out how it focuses on clear action (Call Now) for India-specific helplines.
3. **The Bilingual Edge**: Toggle between English and Hindi to show accessibility.
4. **The Loop**: Show how completing a course in **Shiksha** improves your match % in **Samruddhih**.
5. **Technical Robustness**: Mention the backend's ability to serve demo data even without an active DB, making it a reliable production-ready prototype.

---

## 6. AI Tools Usage (Hackathon Compliance)

- **Reference**: AI used for syntax guidance on Mongoose nested updates and React props.
- **Design Inspiration**: Used to brainstorm the "Emergency UX" principles (one action per screen).
- **Documentation**: Aided in structuring this guide to ensure comprehensive coverage.
- **Originality**: All core logic, route design, translation mapping, and UI implementation are original work by the team.

---
*ViyaStree: Empowering through Power, Education, and Prosperity.*
