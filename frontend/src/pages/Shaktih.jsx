import React, { useState } from 'react'
import { useDemo } from '../context/DemoContext'
import Button from '../components/Button'

export default function Shaktih(){
  const [answer, setAnswer] = useState(null)
  const [q, setQ] = useState('')
  const { askLegalQuery } = useDemo()

  async function ask(){
    const j = await askLegalQuery(q)
    setAnswer(JSON.stringify(j, null, 2))
  }

  return (
    <main>
      <h2>Shaktih — Safety & Legal Awareness</h2>
      <section className="card" aria-labelledby="shaktih-ask">
        <label id="shaktih-ask" style={{display:'block', marginBottom:8}}>Ask about your rights (educational only)</label>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <input aria-label="Legal question" placeholder="Ask: maternity leave rules" value={q} onChange={e=>setQ(e.target.value)} style={{flex:1}} />
          <Button onClick={ask} aria-label="Ask legal question">Ask</Button>
        </div>
        <pre style={{marginTop:8, whiteSpace:'pre-wrap'}}>{answer}</pre>
      </section>
    </main>
  )
}
