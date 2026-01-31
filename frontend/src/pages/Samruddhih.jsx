import React, { useState } from 'react'
import { useDemo } from '../context/DemoContext'
import Button from '../components/Button'

export default function Samruddhih(){
  const [message, setMessage] = useState('')
  const { user, saveOpportunity } = useDemo()

  async function saveOpportunityClick(){
    const j = await saveOpportunity('opp_456')
    setMessage(JSON.stringify(j))
  }

  return (
    <main>
      <h2>Samruddhih — Opportunities</h2>
      <section className="card" aria-labelledby="opp-sample">
        <h3 id="opp-sample">Digital Marketing Intern — Remote — Part-time</h3>
        <p>Saved: {(user.saved_opportunities||[]).join(', ') || 'None'}</p>
        <Button onClick={saveOpportunityClick} aria-label="Save opportunity">Save Opportunity (demo)</Button>
        <div style={{marginTop:8}}>{message}</div>
      </section>
    </main>
  )
}
