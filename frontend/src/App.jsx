import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Shaktih from './pages/Shaktih'
import Shiksha from './pages/Shiksha'
import Samruddhih from './pages/Samruddhih'
import Dashboard from './pages/Dashboard'
import { DemoProvider, useDemo } from './context/DemoContext'
import Header from './components/Header'

function Notifications(){
  const { notifications } = useDemo()
  if(!notifications || notifications.length===0) return null
  return (
    <div className="notifications" role="status" aria-live="polite">
      {notifications.map(n=> <div key={n.id} className="notification">{n.msg}</div>)}
    </div>
  )
}

export default function App() {
  return (
    <DemoProvider>
      <div className="app">
        <Header />
        <Notifications />
        <main id="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/shiksha" element={<Shiksha />} />
            <Route path="/samruddhih" element={<Samruddhih />} />
            <Route path="/shaktih" element={<Shaktih />} />
          </Routes>
        </main>
      </div>
    </DemoProvider>
  )
}
