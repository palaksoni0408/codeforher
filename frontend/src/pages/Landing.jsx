import React from 'react'
import { Link } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Landing() {
  const { t } = useDemo()
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-brand">
          <div className="logo-icon">V</div>
          <span className="logo-text">{t('appName')}</span>
        </div>
        <nav className="landing-nav">
          <LanguageSwitcher className="landing-lang" />
          <Link to="/login" className="landing-link">{t('logIn')}</Link>
          <Link to="/signup" className="landing-btn landing-btn-primary">{t('signUp')}</Link>
        </nav>
      </header>

      <main className="landing-main">
        <div className="landing-badge">
          <span className="landing-badge-icon" aria-hidden>✨</span>
          {t('empoweringWomen')}
        </div>
        <h1 className="landing-title">
          {t('appName')}:
          <span className="landing-devanagari">
            <span className="d-teal">शक्तिः</span>, <span className="d-orange">शिक्षा</span>, <span className="d-purple">समृद्धिः</span>
          </span>
        </h1>
        <p className="landing-translation">{t('threePillarsMeaning')}</p>
        <p className="landing-mission">{t('mission')}</p>

        <section className="landing-concept" aria-labelledby="concept-heading">
          <h2 id="concept-heading" className="concept-heading">{t('whatIsViyastree')}</h2>
          <p className="concept-intro">{t('conceptIntro')}</p>
          <ul className="concept-list">
            <li><strong>Shaktih (शक्तिः)</strong> — {t('conceptShaktih')}</li>
            <li><strong>Shiksha (शिक्षा)</strong> — {t('conceptShiksha')}</li>
            <li><strong>Samruddhih (समृद्धिः)</strong> — {t('conceptSamruddhih')}</li>
          </ul>
          <p className="concept-footer">{t('conceptFooter')}</p>
        </section>

        <div className="landing-cta">
          <Link to="/signup" className="landing-btn landing-btn-primary landing-btn-large">
            {t('startJourney')}
          </Link>
          <Link to="/login" className="landing-btn landing-btn-secondary">
            {t('existingMember')}
          </Link>
        </div>
      </main>
    </div>
  )
}
