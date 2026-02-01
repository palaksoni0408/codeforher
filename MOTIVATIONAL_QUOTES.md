# ViyaStree Motivational Quotes - Quick Reference

## 📋 All Motivational Quotes by Section

### 🏠 Dashboard - Daily Strength Lines
*Rotates daily, shown once per session*

1. "Aap aaj strong hain kyunki aapne mushkil dekhi hai."
2. "Perfect hona zaroori nahi. Vishwas hona zaroori hai."
3. "Har din ek naya mauka hai apne sapno ke kareeb jaane ka."
4. "Aapki mehnat aapki pehchaan hai."
5. "Chhoti shuruat bhi badi safalta ki neev hoti hai."

---

### 📚 Shiksha (Education)

#### When No Courses Started
1. "Seekhne ke liye pehle khud par bharosa."
2. "Apni pehchaan samajhna hi seekhne ki shuruaat hai."

#### When Progress is 40-70%
1. "Aap sahi raaste par hain. Bas thoda aur."
2. "Har kadam aapko aapke lakshya ke kareeb le ja raha hai."

---

### 💼 Samruddhih (Livelihood)

#### Before First Application
"Apni zindagi ki hero aap khud hain."

#### After Successful Application
"Aapko kuch prove nahi karna. Bas apna haq lena hai."

---

### 🛡️ Shaktih (Power & Safety)

#### Section Introduction
"Awaaz uthana bhi suraksha ka ek tareeka hai."

#### Rights Awareness (Available but not currently displayed)
"Apne liye bolna strength hai. Dusron ke liye bolna netritva."

---

### 🎮 Gamification (Available for future use)

#### First Lesson Completed
"Har strong safar pehla kadam se shuru hota hai."

#### First Job Application
"Dar ke baad hi himmat aati hai."

#### Course Halfway
"Aadha safar tay ho chuka. Ab ruk mat jaana."

#### All Courses Completed
"Aapne apne aap par vishwas rakha. Yahi aapki sabse badi jeet hai."

---

## 🎨 Visual Variants by Section

| Section | Variant | Color Theme |
|---------|---------|-------------|
| Dashboard | `gradient` | Teal → Purple gradient |
| Shiksha | `blue` | Blue gradient |
| Samruddhih | `green` | Green gradient |
| Shaktih | `purple` | Purple gradient |

---

## 📍 Quote Placement

```
Dashboard:
  ├── Header (Namaste, User)
  ├── Metrics Grid
  ├── 💬 Motivational Quote (Daily)
  ├── USP Section
  └── Empowerment Loop Cards

Shiksha:
  ├── Page Title
  ├── Learning Streak Card
  ├── 💬 Motivational Quote (Progress-based)
  ├── USP Section
  └── Featured Courses

Samruddhih:
  ├── Page Header
  ├── 💬 Motivational Quote (Application-based)
  ├── USP Section
  ├── Search Bar
  └── Opportunity Grid

Shaktih:
  ├── Page Title
  ├── 💬 Motivational Quote (Section Intro)
  ├── USP Section
  └── Legal Query Form
```

---

## 🔄 Quote Display Logic

### Session-Based Display
- Each quote is shown **once per session**
- Dismissing a quote marks it as shown
- Refreshing the page shows the quote again (new session)

### Context-Based Selection

**Dashboard:**
```javascript
dayOfYear % quotes.length  // Rotates daily
```

**Shiksha:**
```javascript
if (no courses started) → show encouragement
if (40% ≤ progress ≤ 70%) → show mid-progress quote
else → show nothing
```

**Samruddhih:**
```javascript
if (applicationCount === 0) → show "hero" quote
if (justApplied && applicationCount === 1) → show "haq" quote
else → show nothing
```

**Shaktih:**
```javascript
if (!shownThisSession) → show section intro
```

---

## 🎯 Design Principles

1. **Calm & Encouraging** - Never preachy or overwhelming
2. **Contextual** - Appears at meaningful moments only
3. **Dismissible** - User has full control
4. **Accessible** - Large font, ARIA labels, keyboard support
5. **Non-blocking** - Never covers primary actions
6. **Cultural** - Hindi/Hinglish for Indian context

---

## 🛠️ Developer Notes

### Adding New Quotes
Edit `frontend/src/motivationalContent.js`:

```javascript
export const motivationalQuotes = {
  dashboard: {
    daily: [
      // Add new quotes here
    ]
  },
  // ... other sections
}
```

### Using in Components
```jsx
import MotivationalQuote from '../components/MotivationalQuote'
import { getDailyQuote } from '../motivationalContent'

const quote = getDailyQuote()

<MotivationalQuote 
  quote={quote}
  variant="gradient"
  onDismiss={() => handleDismiss()}
/>
```

### Session Management
```javascript
import { 
  wasQuoteShownThisSession, 
  markQuoteAsShown 
} from '../motivationalContent'

// Check if shown
if (!wasQuoteShownThisSession('context')) {
  // Show quote
}

// Mark as shown
markQuoteAsShown('context')
```

---

## ✅ Testing Checklist

- [ ] Dashboard shows daily quote on first load
- [ ] Shiksha shows quote when no courses started
- [ ] Shiksha shows different quote at 50% progress
- [ ] Samruddhih shows quote before first application
- [ ] Samruddhih shows success quote after applying
- [ ] Shaktih shows intro quote on first visit
- [ ] All quotes are dismissible
- [ ] Quotes don't reappear in same session
- [ ] Quotes reappear after page refresh
- [ ] Mobile responsive design works
- [ ] Keyboard navigation works
- [ ] Screen reader announces quotes

---

## 📱 Responsive Behavior

**Desktop (≥640px):**
- Padding: 20px 24px
- Font size: 16px
- Full width with proper margins

**Mobile (<640px):**
- Padding: 16px 18px
- Font size: 15px
- Adjusted spacing for smaller screens
