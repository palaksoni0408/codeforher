import React, { createContext, useContext, useState } from 'react'

const DemoContext = createContext(null)

export function useDemo(){
  return useContext(DemoContext)
}

export function DemoProvider({ children }){
  const [user, setUser] = useState({
    userId: 'demo_user',
    profile: { name: 'Priya (Demo User)', location: 'Raebareli' },
    progress: { level: 3, points: 250, completed_skills: ['tailoring_basic', 'excel_intermediate'], completed_lessons: [], badges: ['Level_3_Achiever'] },
    saved_opportunities: []
  })

  const [notifications, setNotifications] = useState([])

  function pushNotification(msg){
    const id = Date.now()
    setNotifications(n => [...n, { id, msg }])
    // auto-dismiss
    setTimeout(()=> setNotifications(n => n.filter(x=>x.id!==id)), 6000)
  }

  async function completeCourse(courseId, quizScore=85){
    try{
      const resp = await fetch('/api/v1/shiksha/update-progress', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ userId: user.userId, courseId, action: 'complete', quizScore }) })
      const j = await resp.json()
      // update local user state minimally
      setUser(u => ({
        ...u,
        progress: {
          ...(u.progress||{}),
          points: (u.progress.points||0) + (j.pointsEarned||0),
          completed_skills: Array.from(new Set([...(u.progress.completed_skills||[]), courseId]))
        }
      }))
      if (j.orchestrationTriggered) pushNotification('Orchestration: skill_completed emitted')
      return j
    }catch(e){ pushNotification('Error completing course'); return null }
  }

  async function saveOpportunity(opportunityId){
    try{
      const resp = await fetch('/api/v1/samruddhih/save-opportunity', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ userId: user.userId, opportunityId }) })
      const j = await resp.json()
      setUser(u=>({ ...u, saved_opportunities: Array.from(new Set([...(u.saved_opportunities||[]), opportunityId])) }))
      if (j.orchestrationTriggered) pushNotification('Orchestration: opportunity_saved emitted')
      // sample next action: suggest safety if first saved
      if ((user.saved_opportunities||[]).length === 0) pushNotification('Before applying, learn about workplace rights')
      return j
    }catch(e){ pushNotification('Error saving opportunity'); return null }
  }

  async function askLegalQuery(query){
    try{
      const resp = await fetch('/api/v1/shaktih/legal-query', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ userId: user.userId, query }) })
      const j = await resp.json()
      return j
    }catch(e){ return { error: 'network' } }
  }

  return (
    <DemoContext.Provider value={{ user, completeCourse, saveOpportunity, askLegalQuery, notifications, pushNotification }}>
      {children}
    </DemoContext.Provider>
  )
}

export default DemoContext
