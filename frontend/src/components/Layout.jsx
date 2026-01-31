import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bell, House, Briefcase, GraduationCap, Scale, Shield } from './Icon'
import LanguageSwitcher from './LanguageSwitcher'
import { useDemo } from '../context/DemoContext'

export default function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, t } = useDemo()
  const name = user?.profile?.name || 'User'
  const initials = name.split(/\s+/).map(s => s[0]).join('').slice(0, 2).toUpperCase()

  const nav = [
    { path: '/dashboard', label: t('dashboard'), Icon: House },
    { path: '/samruddhih', label: t('samruddhih'), Icon: Briefcase },
    { path: '/shiksha', label: t('shiksha'), Icon: GraduationCap },
    { path: '/shaktih', label: t('shaktih'), Icon: Scale }
  ]

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">{t('empowermentLoop')}</h2>
        <nav className="sidebar-nav" role="navigation" aria-label="Main">
          {nav.map(({ path, label, Icon }) => {
            const isActive = path === '/dashboard' ? location.pathname === '/dashboard' : location.pathname.startsWith(path)
            return (
              <Link
                key={path}
                to={path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={20} />
                <span>{label}</span>
                {isActive && <span className="sidebar-dot" aria-hidden />}
              </Link>
            )
          })}
        </nav>
        <div className="sidebar-safety">
          <div className="safety-card">
            <Shield size={18} />
            <span>{t('emergencyAlert')}</span>
          </div>
          <button type="button" className="sos-btn" aria-label={t('sosAlert')}>{t('sosAlert')}</button>
        </div>
      </aside>

      <div className="main-wrap">
        <header className="app-header">
          <div className="app-brand">
            <div className="logo-icon small">V</div>
            <span className="logo-text">{t('appName')}</span>
          </div>
          <div className="header-actions">
            <LanguageSwitcher />
            <button type="button" className="icon-btn" aria-label={t('notifications')}>
              <Bell size={20} />
              <span className="notification-dot" aria-hidden />
            </button>
            <div className="user-menu">
              <div className="avatar" aria-hidden>{initials}</div>
              <span className="user-name">{name}</span>
            </div>
            <button
              type="button"
              className="icon-btn text"
              onClick={() => { logout(); navigate('/', { replace: true }); }}
              aria-label={t('logOut')}
            >
              {t('logOut')}
            </button>
          </div>
        </header>

        <main id="main" className="app-main">
          {children}
        </main>
      </div>
    </div>
  )
}
