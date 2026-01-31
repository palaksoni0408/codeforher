import React, { useEffect, useState } from 'react'
import { useDemo } from '../context/DemoContext'

export default function Dashboard() {
  const { user } = useDemo()
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/v1/orchestration/dashboard?userId=demo_user')
      .then(r => r.json())
      .then(setData)
      .catch(() => setData(null))
  }, [])

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="card profile">
        <div className="avatar" />
        <div className="info">
          <div><strong>{user.profile.name}</strong></div>
          <div>{user.profile.location}</div>
          <div>Level: {user.progress.level} • Points: {user.progress.points}</div>
        </div>
      </div>

      <div className="card">
        <strong>Empowerment Score:</strong> {data ? data.empowermentScore : '—'}
      </div>
      <div className="card">
        <strong>Recommendations:</strong>
        <ul>
          {(data && data.recommendations && data.recommendations.length>0) ? data.recommendations.map((r,i)=><li key={i}>{r.message}</li>) : <li>No recommendations yet</li>}
        </ul>
      </div>
    </div>
  )
}
