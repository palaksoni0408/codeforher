import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDemo } from './context/DemoContext'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Shiksha from './pages/Shiksha'
import Samruddhih from './pages/Samruddhih'
import Shaktih from './pages/Shaktih'

function Notifications() {
  const { notifications } = useDemo()
  if (!notifications || notifications.length === 0) return null
  return (
    <div className="notifications" role="status" aria-live="polite">
      {notifications.map(n => (
        <div key={n.id} className="notification">{n.msg}</div>
      ))}
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useDemo()
  if (!isLoggedIn) return <Navigate to="/" replace />
  return <Layout>{children}</Layout>
}

export default function App() {
  return (
    <div className="app">
      <Notifications />
      <Routes>
        <Route path="/" element={<LandingOrDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shiksha"
          element={
            <ProtectedRoute>
              <Shiksha />
            </ProtectedRoute>
          }
        />
        <Route
          path="/samruddhih"
          element={
            <ProtectedRoute>
              <Samruddhih />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shaktih"
          element={
            <ProtectedRoute>
              <Shaktih />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

function LandingOrDashboard() {
  const { isLoggedIn } = useDemo()
  if (isLoggedIn) return <Navigate to="/dashboard" replace />
  return <Landing />
}
