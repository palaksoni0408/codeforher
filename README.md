# ViyaStree: शक्तिः, शिक्षा, समृद्धिः 🌸

**Power, Education, Prosperity** — A holistic digital ecosystem for the empowerment of Indian women. ViyaStree bridges the gap between digital safety (Shaktih), skill development (Shiksha), and decentralized livelihood (Samruddhih).

ViyaStree is designed with a **Premium Indian Aesthetic** (Playfair Display typography, Mukta body text, and a rich cultural palette) and provides **Full Bilingual Support** (English & Hindi) to be accessible across diverse communities.

---

## 🚀 Key Features

### 🔴 Shaktih (Power & Safety) – Specialized Emergency UX
- **One-Touch SOS**: Immediate access to Indian emergency helplines: **112** (National), **1091** (Women), **181** (Domestic Abuse), **1098** (Childline).
- **Nearby Help**: GPS-integrated lookup for Police Stations (Women Desks), Hospitals (PHCs), Sakhi One Stop Centres (OSC), and local NGOs.
- **Location Awareness**: Automatic advice on sharing live location with trusted contacts in emergencies.

### 📚 Shiksha (Education & Growth)
- **Learning Streak**: Daily engagement tracking with gamified progress.
- **Skill-Based Courses**: Localized and digital skill training (Tailoring, Digital Literacy, Hands-on Vocational Skills).
- **Ask Mentor**: Direct connection to verified Educators, Counselors, and Volunteers, including Govt helplines like **Kiran** (Mental Health) and **Tele-MANAS**.

### 💼 Samruddhih (Prosperity & Livelihood)
- **Smart Job Matching**: Skill-fit % analysis for every opportunity.
- **Localized Work**: Focus on home-based work, digital opportunities, and community-based roles (Anganwadi, local vending).
- **Skill Pillars**: Integrated learning paths that lead directly to livelihood applications.

---

## 🛠️ Tech Stack & Setup

### Backend (Node.js & Express)
- **MongoDB Integration**: Persistence for user progress, applications, and logs. (Optional: Server starts with demo fallback if DB is offline).
- **Event Orchestrator**: Triggers cross-module recommendations (e.g., suggesting a safety module after a job application).
- **APIs**:
  - `GET /api/v1/shaktih/help-centers`: Nearby safety resources.
  - `GET /api/v1/shiksha/mentors`: List of verified experts.
  - `POST /api/v1/shaktih/sos`: Trigger emergency event.

### Frontend (React & Vite)
- **Premium UI**: Custom-built with a focus on trust, empowerment, and clarity.
- **Bilingual Engine**: Real-time switching between English and Hindi.
- **Context API**: Centralized state for user empowerment metrics and notifications.

---

## 🏃 Quick Start

### 1. Backend Setup
```powershell
cd backend
npm install
npm start
```
*Note: The backend defaults to port 5000. It includes demo data fallbacks for all features.*

### 2. Frontend Setup
```powershell
cd frontend
npm install
npm run dev
```
*Note: Open the provided URL (usually http://localhost:5173). Ensure the backend is running for the full interactive experience.*

---

## 📂 Project Structure
- `frontend/src/pages/Landing.jsx`: The premium interactive gateway with Quick Actions.
- `frontend/src/translations.js`: Comprehensive EN/HI mapping for all features.
- `backend/controllers/`: Logic for SOS handling, mentor matching, and job retrieval.
- `backend/models/`: Schemas for `HelpCenter`, `Mentor`, `User`, and `Opportunity`.

---

## 🛡️ Hackathon Note
ViyaStree is built on the principle of **"One Action per Screen"** for emergency situations, ensuring that in high-stress moments, users are guided by clear, high-contrast, and actionable information.

For a detailed code-level breakdown, see **[SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md)**.
