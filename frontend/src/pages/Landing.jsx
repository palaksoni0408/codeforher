import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import USPSection from '../components/USPSection'

export default function Landing() {
  const { t } = useDemo()
  const [activeSlide, setActiveSlide] = useState(0)

  // Carousel Logic (4s interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev === 3 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const carouselSlides = [
    { title: t('carouselSlide1Title'), desc: t('carouselSlide1Desc'), icon: '💰' },
    { title: t('carouselSlide2Title'), desc: t('carouselSlide2Desc'), icon: '🧠' },
    { title: t('carouselSlide3Title'), desc: t('carouselSlide3Desc'), icon: '👶' },
    { title: t('carouselSlide4Title'), desc: t('carouselSlide4Desc'), icon: '🌸' }
  ]

  const serviceHubItems = [
    {
      id: 'edu',
      title: t('serviceEduTitle'),
      desc: t('serviceEduDesc'),
      icon: '📚',
      badge: 'POPULAR',
      badgeClass: 'badge-popular',
      points: [t('serviceEduPoint1'), t('serviceEduPoint2'), t('serviceEduPoint3'), t('serviceEduPoint4')]
    },
    {
      id: 'safe',
      title: t('serviceSafeTitle'),
      desc: t('serviceSafeDesc'),
      icon: '🛡️',
      badge: '24/7',
      badgeClass: 'badge-new',
      points: [t('serviceSafePoint1'), t('serviceSafePoint2'), t('serviceSafePoint3'), t('serviceSafePoint4')]
    },
    {
      id: 'career',
      title: t('serviceCareerTitle'),
      desc: t('serviceCareerDesc'),
      icon: '💼',
      badge: 'VERIFIED',
      badgeClass: 'badge-verified',
      points: [t('serviceCareerPoint1'), t('serviceCareerPoint2'), t('serviceCareerPoint3'), t('serviceCareerPoint4')]
    },
    {
      id: 'health',
      title: t('serviceHealthTitle'),
      desc: t('serviceHealthDesc'),
      icon: '🌸',
      badge: 'FREE',
      badgeClass: 'badge-free',
      points: [t('serviceHealthPoint1'), t('serviceHealthPoint2'), t('serviceHealthPoint3'), t('serviceHealthPoint4')]
    },
    {
      id: 'finance',
      title: t('serviceFinanceTitle'),
      desc: t('conceptSamruddhih'), // Fallback or generic desc
      icon: '💰',
      badge: 'NEW',
      badgeClass: 'badge-new',
      points: [t('serviceFinancePoint1'), t('serviceFinancePoint2'), t('serviceFinancePoint3'), t('serviceFinancePoint4')]
    },
    {
      id: 'comm',
      title: t('serviceCommTitle'),
      desc: t('conceptIntro'), // Fallback or generic desc
      icon: '👥',
      badge: 'TRENDING',
      badgeClass: 'badge-popular',
      points: [t('serviceCommPoint1'), t('serviceCommPoint2'), t('serviceCommPoint3'), t('serviceCommPoint4')]
    }
  ]

  return (
    <div className="landing">
      <div className="hero-illustrations">
        <span className="illustration-icon icon-1">👩‍⚕️</span>
        <span className="illustration-icon icon-2">👩‍🏫</span>
        <span className="illustration-icon icon-3">👩‍💼</span>
      </div>

      <header className="landing-header">
        <div className="landing-brand">
          <div className="logo-icon">V</div>
          <span className="logo-text playfair">{t('appName')}</span>
        </div>
        <nav className="landing-nav">
          <LanguageSwitcher className="landing-lang" />
          <Link to="/login" className="landing-link">{t('logIn')}</Link>
          <Link to="/signup" className="landing-btn landing-btn-primary">{t('signUp')}</Link>
        </nav>
      </header>

      <main className="landing-main animate-fade-up">
        {/* Hero Section */}
        <div className="landing-badge">
          <span className="landing-badge-icon" aria-hidden>✨</span>
          {t('empoweringWomen')}
        </div>
        <h1 className="landing-title playfair">
          {t('appName')}
          <span className="landing-devanagari">
            <span className="d-teal">शक्तिः</span>, <span className="d-orange">शिक्षा</span>, <span className="d-purple">समृद्धिः</span>
          </span>
        </h1>
        <p className="landing-translation">{t('threePillarsMeaning')}</p>
        <p className="landing-mission">{t('mission')}</p>

        {/* Quick Actions Bar */}
        <div className="quick-actions-bar">
          <button className="action-btn btn-sos" onClick={() => alert('SOS Alert Triggered!')}>
            <i aria-hidden>🚨</i>
            <span className="action-label">{t('sosLabel')}</span>
          </button>
          <Link to="/signup" className="action-btn">
            <i aria-hidden>📍</i>
            <span className="action-label">{t('nearbyHelpLabel')}</span>
          </Link>
          <Link to="/signup" className="action-btn">
            <i aria-hidden>💬</i>
            <span className="action-label">{t('askMentorLabel')}</span>
          </Link>
          <Link to="/signup" className="action-btn">
            <i aria-hidden>💼</i>
            <span className="action-label">{t('findJobsLabel')}</span>
          </Link>
        </div>

        {/* Services Hub */}
        <section className="services-hub">
          <h2 className="playfair">{t('servicesHubTitle')} 🌸</h2>
          <p className="concept-intro">{t('servicesHubSubtitle')}</p>

          <div className="services-grid">
            {serviceHubItems.map(service => (
              <div key={service.id} className={`service-card card-${service.id}`}>
                <span className={`service-badge ${service.badgeClass}`}>{service.badge}</span>
                <span className="service-icon-large">{service.icon}</span>
                <h3 className="service-title playfair">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <ul className="service-points">
                  {service.points.map((pt, i) => <li key={i}>{pt}</li>)}
                </ul>
                <Link to="/signup" className="landing-btn landing-btn-primary" style={{ width: '100%' }}>
                  {t('explore')}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Rotating Carousel Slide */}
        <section className="services-carousel">
          <div className="carousel-content">
            {carouselSlides.map((slide, index) => (
              <div key={index} className={`carousel-slide ${activeSlide === index ? 'active' : ''}`}>
                <span className="carousel-icon">{slide.icon}</span>
                <h3 className="carousel-title playfair">{slide.title}</h3>
                <p className="carousel-desc">{slide.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-concept" aria-labelledby="concept-heading">
          <h2 id="concept-heading" className="concept-heading playfair">{t('whatIsViyastree')}</h2>
          <p className="concept-intro">{t('conceptIntro')}</p>
          <ul className="concept-list">
            <li><strong>Shaktih (शक्तिः)</strong> — {t('conceptShaktih')}</li>
            <li><strong>Shiksha (शिक्षा)</strong> — {t('conceptShiksha')}</li>
            <li><strong>Samruddhih (समृद्धिः)</strong> — {t('conceptSamruddhih')}</li>
          </ul>
        </section>

        <USPSection
          heading={t('uspViyastreeHeading')}
          points={[
            t('uspViyastreePoint1'),
            t('uspViyastreePoint2'),
            t('uspViyastreePoint3'),
            t('uspViyastreePoint4')
          ]}
          variant="gradient"
        />

        {/* Profile Progress Preview */}
        <div className="profile-progress-preview">
          <div className="progress-header">
            <h3 className="progress-title playfair">{t('profileProgressTitle')}</h3>
            <span className="progress-percentage">60%</span>
          </div>
          <div className="progress-bar-large">
            <div className="progress-fill-animated" style={{ width: '60%' }}></div>
          </div>
          <p className="progress-tip">✨ {t('profileProgressTip')}</p>
        </div>

        <section className="landing-footer animate-fade-up">
          <h2 className="footer-title playfair">{t('footerCtaTitle')}</h2>
          <p className="footer-desc">{t('footerCtaDesc')}</p>
          <div className="landing-cta">
            <Link to="/signup" className="landing-btn landing-btn-primary landing-btn-large">
              {t('startJourney')}
            </Link>
            <Link to="/login" className="landing-btn landing-btn-secondary">
              {t('existingMember')}
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
