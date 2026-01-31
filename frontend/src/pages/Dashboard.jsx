import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'
import { GraduationCap, Briefcase, Scale, Shield, ChevronUp, ArrowRight } from '../components/Icon'
import ProgressBar from '../components/ProgressBar'

export default function Dashboard() {
  const { user, dashboard, setDashboard, t } = useDemo()
  const userId = user?.userId || 'demo_user'

  useEffect(() => {
    fetch(`/api/v1/orchestration/dashboard?userId=${userId}`)
      .then(r => r.json())
      .then(setDashboard)
      .catch(() => setDashboard(null))
  }, [userId, setDashboard])

  const d = dashboard
  const name = user?.profile?.name || d?.profile?.name || 'User'
  const skillsLearned = d?.skillsLearned ?? user?.progress?.completed_skills?.length ?? 0
  const jobsApplied = d?.jobsApplied ?? user?.applications?.length ?? 0
  const rightsKnown = d?.rightsKnown ?? user?.progress?.rightsKnownCount ?? 0
  const safetyScore = d?.safetyScore ?? user?.progress?.safetyScore ?? 0
  const recommendations = d?.recommendations || []

  const loopCards = [
    { to: '/shiksha', icon: GraduationCap, title: t('shiksha'), desc: t('shikshaDesc'), color: 'blue' },
    { to: '/samruddhih', icon: Briefcase, title: t('samruddhih'), desc: t('samruddhihDesc'), color: 'green' },
    { to: '/shaktih', icon: Shield, title: t('shaktih'), desc: t('shaktihDesc'), color: 'purple' }
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-greeting">{t('namaste')}, {name}</h1>
          <p className="dashboard-tagline">{t('journeyContinues')}</p>
        </div>
        <span className="status-badge">{t('currentStatus')}</span>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <GraduationCap size={24} />
          <span className="metric-label">{t('skillsLearned')}</span>
          <span className="metric-value">{skillsLearned}</span>
        </div>
        <div className="metric-card">
          <Briefcase size={24} />
          <span className="metric-label">{t('jobsApplied')}</span>
          <span className="metric-value">{jobsApplied}</span>
        </div>
        <div className="metric-card">
          <Scale size={24} />
          <span className="metric-label">{t('rightsKnown')}</span>
          <span className="metric-value">{rightsKnown}</span>
        </div>
        <div className="metric-card">
          <Shield size={24} />
          <span className="metric-label">{t('safetyScore')}</span>
          <div className="metric-with-bar">
            <span className="metric-value">{safetyScore}%</span>
            <ProgressBar percent={safetyScore} showLabel={false} className="metric-progress" />
          </div>
        </div>
      </div>

      <section className="empowerment-loop">
        <h2 className="section-title">
          <ChevronUp size={18} />
          {t('yourEmpowermentLoop')}
        </h2>
        <div className="loop-cards">
          {loopCards.map(({ to, icon: Icon, title, desc, color }) => (
            <Link key={to} to={to} className={`loop-card loop-card-${color}`}>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="loop-card-cta">{t('explore')} <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="recommended">
        <h2 className="section-title">{t('recommendedForYou')}</h2>
        <ul className="recommended-list">
          {recommendations.length > 0
            ? recommendations.map((r, i) => (
                <li key={i} className="recommended-item">{r.message}</li>
              ))
            : <li className="recommended-item">{t('exploreShikshaRecommendation')}</li>
          }
        </ul>
      </section>
    </div>
  )
}
