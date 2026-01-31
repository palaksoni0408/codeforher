import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bell, User } from './Icon'

export default function Header(){
  const loc = useLocation()

  return (
    <header className="topbar" role="banner">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="brand">
        <h1>ViyaStree</h1>
        <small className="tag">शक्तिः • शिक्षा • समृद्धिः</small>
      </div>

      <nav role="navigation" aria-label="Main navigation">
        <Link to="/" aria-current={loc.pathname === '/' ? 'page' : undefined}>Dashboard</Link>
        <Link to="/shiksha" aria-current={loc.pathname.startsWith('/shiksha') ? 'page' : undefined}>Shiksha</Link>
        <Link to="/samruddhih" aria-current={loc.pathname.startsWith('/samruddhih') ? 'page' : undefined}>Samruddhih</Link>
        <Link to="/shaktih" aria-current={loc.pathname.startsWith('/shaktih') ? 'page' : undefined}>Shaktih</Link>
      </nav>

      <div className="header-actions" aria-hidden="false">
        <button className="icon-btn" aria-label="Notifications"><Bell /></button>
        <button className="icon-btn" aria-label="Profile"><User /></button>
      </div>
    </header>
  )
}
