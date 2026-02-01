import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, getStoredLanguage, setStoredLanguage, interpolate } from '../translations'

const DemoContext = createContext(null)

export function useDemo() {
  return useContext(DemoContext)
}

const STORAGE_KEY = 'viyastree_user'

export function DemoProvider({ children }) {
  const [language, setLanguageState] = useState(getStoredLanguage)
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch (_) { }
    return null
  })
  const [notifications, setNotifications] = useState([])
  const [dashboard, setDashboard] = useState(null)

  function setLanguage(lang) {
    if (lang === 'en' || lang === 'hi') {
      setLanguageState(lang)
      setStoredLanguage(lang)
    }
  }

  function t(key, params) {
    const lang = translations[language] || translations.en
    const str = lang[key] ?? translations.en[key] ?? key
    return interpolate(str, params)
  }

  const userId = user?.userId || 'demo_user'

  useEffect(() => {
    if (!user) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } catch (_) { }
  }, [user])

  // Dashboard is fetched by the Dashboard page when mounted

  function pushNotification(msg) {
    const id = Date.now()
    setNotifications(n => [...n, { id, msg }])
    setTimeout(() => setNotifications(n => n.filter(x => x.id !== id)), 6000)
  }

  function login({ email, name }) {
    setUser({
      userId: 'demo_user',
      profile: { name: name || 'User', email, location: 'Raebareli' },
      progress: { level: 1, points: 0, completed_skills: [], courseProgress: {}, learningStreakDays: 0, safetyScore: 0, rightsKnownCount: 0 },
      saved_opportunities: [],
      applications: []
    })
  }

  function signup({ name, email }) {
    setUser({
      userId: 'demo_user',
      profile: { name: name || 'User', email, location: 'Raebareli' },
      progress: { level: 1, points: 0, completed_skills: [], courseProgress: {}, learningStreakDays: 0, safetyScore: 0, rightsKnownCount: 0 },
      saved_opportunities: [],
      applications: []
    })
  }

  function logout() {
    setUser(null)
    setDashboard(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (_) { }
  }

  async function completeCourse(courseId, quizScore = 85, percentComplete) {
    try {
      const body = { userId, courseId, action: percentComplete >= 100 ? 'complete' : undefined, quizScore: percentComplete >= 100 ? quizScore : undefined, percentComplete }
      const resp = await fetch('/api/v1/shiksha/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const j = await resp.json()
      setUser(u => ({
        ...u,
        progress: {
          ...(u.progress || {}),
          points: (u.progress?.points || 0) + (j.pointsEarned || 0),
          completed_skills: j.totalPoints !== undefined ? [...new Set([...(u.progress?.completed_skills || []), courseId])] : (u.progress?.completed_skills || []),
          courseProgress: { ...(u.progress?.courseProgress || {}), [courseId]: j.percentComplete ?? u.progress?.courseProgress?.[courseId] ?? 0 },
          learningStreakDays: j.learningStreakDays ?? u.progress?.learningStreakDays ?? 0
        }
      }))
      if (j.orchestrationTriggered) pushNotification('Orchestration: skill_completed emitted')
      return j
    } catch (e) {
      pushNotification('Error updating progress')
      return null
    }
  }

  async function saveOpportunity(opportunityId) {
    try {
      const resp = await fetch('/api/v1/samruddhih/save-opportunity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, opportunityId })
      })
      const j = await resp.json()
      setUser(u => ({ ...u, saved_opportunities: Array.from(new Set([...(u.saved_opportunities || []), opportunityId])) }))
      if (j.orchestrationTriggered) pushNotification('Orchestration: opportunity_saved emitted')
      if ((user?.saved_opportunities || []).length === 0) pushNotification('Before applying, learn about workplace rights')
      return j
    } catch (e) {
      pushNotification('Error saving opportunity')
      return null
    }
  }

  async function applyToOpportunity(opportunityId) {
    try {
      const resp = await fetch('/api/v1/samruddhih/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, opportunityId })
      })
      const j = await resp.json()
      if (j.applied) {
        setUser(u => ({
          ...u,
          applications: [...(u.applications || []), { opportunityId, status: 'applied' }]
        }))
        pushNotification('Application submitted!')
      }
      return j
    } catch (e) {
      pushNotification('Error submitting application')
      return null
    }
  }

  async function askLegalQuery(query) {
    try {
      const resp = await fetch('/api/v1/shaktih/legal-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, query })
      })
      let j
      try {
        j = await resp.json()
      } catch (_) {
        return { error: 'network', message: 'Invalid response from server.' }
      }
      return j
    } catch (e) {
      return { error: 'network', message: 'Could not reach server.' }
    }
  }

  async function sendSOS() {
    try {
      const resp = await fetch('/api/v1/shaktih/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, location: 'Current GPS Coordinates' })
      })
      return await resp.json()
    } catch (e) {
      return { success: false, message: 'Failed to send SOS' }
    }
  }

  async function getHelpCenters() {
    try {
      const resp = await fetch('/api/v1/shaktih/help-centers')
      return await resp.json()
    } catch (e) {
      return { centers: [] }
    }
  }

  async function getMentors() {
    try {
      const resp = await fetch('/api/v1/shiksha/mentors')
      return await resp.json()
    } catch (e) {
      return { mentors: [] }
    }
  }

  const value = {
    user,
    dashboard,
    setDashboard,
    isLoggedIn: !!user,
    login,
    signup,
    logout,
    completeCourse,
    saveOpportunity,
    applyToOpportunity,
    askLegalQuery,
    sendSOS,
    getHelpCenters,
    getMentors,
    notifications,
    pushNotification,
    language,
    setLanguage,
    t
  }

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  )
}

export default DemoContext
