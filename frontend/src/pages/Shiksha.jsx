import React, { useState } from 'react'
import { useDemo } from '../context/DemoContext'

export default function Shiksha(){
  const { user, completeCourse } = useDemo()
  const [message, setMessage] = useState('')

  async function completeCourseClick(){
    const j = await completeCourse('digital_marketing_basic', 85)
    setMessage(`Points earned: ${j?.pointsEarned || 0}. Orchestration: ${j?.orchestrationTriggered}`)
  }

  return (
    <main>
      <h2>Shiksha — Learning</h2>
      <section className="card" aria-labelledby="shiksha-course">
        <h3 id="shiksha-course">Digital Marketing Basics</h3>
        <p>Progress: Completed skills: {(user.progress.completed_skills||[]).join(', ')}</p>
        <button className="btn" onClick={completeCourseClick} aria-label="Complete the digital marketing course">Complete Course (demo)</button>
        <div style={{marginTop:8}}>{message}</div>
      </section>
    </main>
  )
}
