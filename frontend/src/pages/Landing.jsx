import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import USPSection from '../components/USPSection'
import Modal from '../components/Modal'

export default function Landing() {
  const { t, sendSOS, getHelpCenters, getMentors } = useDemo()
  const [activeSlide, setActiveSlide] = useState(0)

  // Modal states
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [activeService, setActiveService] = useState(null)
  const [actionModal, setActionModal] = useState({ type: null, data: null, loading: false })

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

  const handleSOS = async () => {
    setActionModal({ type: 'sos', loading: true, data: null })
    const res = await sendSOS()
    setActionModal({ type: 'sos', loading: false, data: res })
  }

  const handleNearbyHelp = async () => {
    setActionModal({ type: 'help', loading: true, data: null })
    const res = await getHelpCenters()
    setActionModal({ type: 'help', loading: false, data: res.centers })
  }

  const handleMentors = async () => {
    setActionModal({ type: 'mentors', loading: true, data: null })
    const res = await getMentors()
    setActionModal({ type: 'mentors', loading: false, data: res.mentors })
  }

  const handleFindJobs = async () => {
    setActionModal({ type: 'jobs', loading: true, data: null })
    const resp = await fetch('/api/v1/samruddhih/opportunities')
    const j = await resp.json()
    setActionModal({ type: 'jobs', loading: false, data: j.opportunities })
  }

  const serviceHubItems = [
    {
      id: 'edu',
      title: t('serviceEduTitle'),
      desc: t('serviceEduDesc'),
      icon: '📚',
      badge: 'POPULAR',
      badgeClass: 'badge-popular',
      points: [t('serviceEduPoint1'), t('serviceEduPoint2'), t('serviceEduPoint3'), t('serviceEduPoint4')],
      content: t('exploreEduContent')
    },
    {
      id: 'safe',
      title: t('serviceSafeTitle'),
      desc: t('serviceSafeDesc'),
      icon: '🛡️',
      badge: '24/7',
      badgeClass: 'badge-new',
      points: [t('serviceSafePoint1'), t('serviceSafePoint2'), t('serviceSafePoint3'), t('serviceSafePoint4')],
      content: t('exploreSafeContent')
    },
    {
      id: 'career',
      title: t('serviceCareerTitle'),
      desc: t('serviceCareerDesc'),
      icon: '💼',
      badge: 'VERIFIED',
      badgeClass: 'badge-verified',
      points: [t('serviceCareerPoint1'), t('serviceCareerPoint2'), t('serviceCareerPoint3'), t('serviceCareerPoint4')],
      content: t('exploreCareerContent')
    },
    {
      id: 'health',
      title: t('serviceHealthTitle'),
      desc: t('serviceHealthDesc'),
      icon: '🌸',
      badge: 'FREE',
      badgeClass: 'badge-free',
      points: [t('serviceHealthPoint1'), t('serviceHealthPoint2'), t('serviceHealthPoint3'), t('serviceHealthPoint4')],
      content: t('conceptIntro')
    },
    {
      id: 'finance',
      title: t('serviceFinanceTitle'),
      desc: t('conceptSamruddhih'),
      icon: '💰',
      badge: 'NEW',
      badgeClass: 'badge-new',
      points: [t('serviceFinancePoint1'), t('serviceFinancePoint2'), t('serviceFinancePoint3'), t('serviceFinancePoint4')],
      content: t('conceptSamruddhih')
    },
    {
      id: 'comm',
      title: t('serviceCommTitle'),
      desc: t('conceptIntro'),
      icon: '👥',
      badge: 'TRENDING',
      badgeClass: 'badge-popular',
      points: [t('serviceCommPoint1'), t('serviceCommPoint2'), t('serviceCommPoint3'), t('serviceCommPoint4')],
      content: t('conceptIntro')
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
          <img src="/logo.png" alt="ViyaStree Logo" className="logo-img" style={{ height: '40px', marginRight: '12px' }} />
          <span className="logo-text playfair">{t('appName')}</span>
        </div>
        <nav className="landing-nav">
          <LanguageSwitcher className="landing-lang" />
          <Link to="/login" className="landing-link">{t('logIn')}</Link>
          <Link to="/signup" className="landing-btn landing-btn-primary">{t('signUp')}</Link>
        </nav>
      </header>

      <main className="landing-main animate-fade-up">
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

        <div className="quick-actions-bar">
          <button className="action-btn btn-sos" onClick={handleSOS}>
            <i aria-hidden>🚨</i>
            <span className="action-label">{t('sosLabel')}</span>
          </button>
          <button className="action-btn" onClick={handleNearbyHelp}>
            <i aria-hidden>📍</i>
            <span className="action-label">{t('nearbyHelpLabel')}</span>
          </button>
          <button className="action-btn" onClick={handleMentors}>
            <i aria-hidden>💬</i>
            <span className="action-label">{t('askMentorLabel')}</span>
          </button>
          <button className="action-btn" onClick={handleFindJobs}>
            <i aria-hidden>💼</i>
            <span className="action-label">{t('findJobsLabel')}</span>
          </button>
        </div>

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
                <button
                  className="landing-btn landing-btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => setActiveService(service)}
                >
                  {t('explore')}
                </button>
              </div>
            ))}
          </div>
        </section>

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

        <section className="landing-concept" onClick={() => setIsAboutModalOpen(true)} style={{ cursor: 'pointer' }}>
          <h2 className="concept-heading playfair">{t('whatIsViyastree')} ↗️</h2>
          <p className="concept-intro">{t('conceptIntro')}</p>
          <p className="concept-tip" style={{ fontStyle: 'italic', opacity: 0.7 }}>Click to learn more about our mission</p>
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

      {/* MODALS */}
      <Modal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        title={t('aboutViyaTitle')}
      >
        <p>{t('aboutViyaContent')}</p>
        <h3>{t('aboutViyaVision')}</h3>
        <ul>
          <li>{t('aboutViyaPillar1')}</li>
          <li>{t('aboutViyaPillar2')}</li>
          <li>{t('aboutViyaPillar3')}</li>
        </ul>
      </Modal>

      <Modal
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        title={activeService?.title}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '4rem' }}>{activeService?.icon}</span>
        </div>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-deep-purple)' }}>{activeService?.desc}</p>
        <div style={{ padding: '20px', background: 'var(--color-warm-beige)', borderRadius: '12px', marginBottom: '24px', lineHeight: '1.7' }}>
          {activeService?.content}
        </div>
        <h3>Key Benefits:</h3>
        <ul>
          {activeService?.points.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
        <Link to="/signup" className="landing-btn landing-btn-primary" style={{ width: '100%', marginTop: '20px', display: 'block', textAlign: 'center' }}>
          Get Started with {activeService?.title}
        </Link>
      </Modal>

      <Modal
        isOpen={!!actionModal.type}
        onClose={() => setActionModal({ type: null, data: null, loading: false })}
        title={
          actionModal.type === 'sos' ? t('sosTitle') :
            actionModal.type === 'help' ? t('nearbyHelpTitle') :
              actionModal.type === 'mentors' ? t('mentorTitle') :
                t('jobsTitle')
        }
      >
        {actionModal.loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '20px', color: 'var(--color-deep-purple)' }}>Connecting to ViyaStree Secure Backend...</p>
          </div>
        ) : (
          <div className="action-data-content">
            {actionModal.type === 'sos' && (
              <div className="sos-emergency-view">
                <p className="sos-priority" style={{ fontSize: '1rem', marginBottom: '20px', fontWeight: '500' }}>{t('sosPriority')}</p>
                <div className="helplines-list" style={{ display: 'grid', gap: '12px' }}>
                  {[
                    { num: '112', label: t('sosHelpline112') },
                    { num: '1091', label: t('sosHelpline1091') },
                    { num: '181', label: t('sosHelpline181') },
                    { num: '1098', label: t('sosHelpline1098') },
                    { num: '108', label: t('sosHelpline108') }
                  ].map(h => (
                    <div key={h.num} className="helpline-item" style={{ background: '#fff1f2', border: '1px solid #fecdd3', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', color: '#be123c', fontSize: '0.9rem' }}>{h.label}</span>
                      <button className="landing-btn" style={{ background: '#e11d48', color: '#fff', fontSize: '0.8rem', padding: '8px 16px', minWidth: '100px' }} onClick={() => window.open(`tel:${h.num}`)}>Call Now</button>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '24px', padding: '16px', background: 'var(--color-warm-beige)', borderRadius: '12px' }}>
                  <h4 style={{ margin: '0 0 8px 0' }}>{t('sosLocationTitle')}</h4>
                  <p style={{ fontSize: '0.85rem', margin: 0 }}>{t('sosLocationDesc')}</p>
                </div>
                <p style={{ marginTop: '20px', fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>{t('sosTip')}</p>
              </div>
            )}

            {actionModal.type === 'help' && (
              <div className="nearby-help-view">
                <p style={{ fontWeight: '500', marginBottom: '20px', fontSize: '1rem' }}>{t('nearbyHelpSubtitle')}</p>
                <h4 style={{ color: 'var(--color-deep-purple)', marginBottom: '10px' }}>{t('nearbySupportTitle')}</h4>
                <div className="support-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {[t('nearbySupportPolice'), t('nearbySupportHospital'), t('nearbySupportDesk'), t('nearbySupportNGO')].map(s => (
                    <span key={s} style={{ background: 'var(--color-cream)', padding: '6px 12px', borderRadius: '20px', border: '1px solid #eee', fontSize: '0.8rem' }}>{s}</span>
                  ))}
                </div>
                <div style={{ background: '#f0f9ff', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd', marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#0369a1', fontSize: '0.9rem' }}>{t('nearbyHowItWorksTitle')}</h4>
                  <p style={{ fontSize: '0.85rem', margin: 0, color: '#075985' }}>{t('nearbyHowItWorksDesc')}</p>
                </div>
                <div className="data-list">
                  {actionModal.data?.map((item, i) => (
                    <div key={i} className="data-item" style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', color: 'var(--color-deep-purple)', fontSize: '1rem' }}>{item.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>{item.type} • {item.distance}</p>
                        {item.address && <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem' }}>📍 {item.address}</p>}
                      </div>
                      <button className="landing-btn landing-btn-primary" style={{ padding: '8px 12px', fontSize: '0.75rem', marginLeft: '10px' }}>Get Help</button>
                    </div>
                  ))}
                </div>
                <p style={{ textAlign: 'center', marginTop: '24px', fontWeight: 'bold', color: 'var(--color-teal)', fontSize: '0.9rem' }}>{t('nearbyMotivation')}</p>
              </div>
            )}

            {actionModal.type === 'mentors' && (
              <div className="mentor-view">
                <p style={{ fontWeight: '500', marginBottom: '20px', fontSize: '1rem' }}>{t('mentorSubtitle')}</p>
                <h4 style={{ color: 'var(--color-deep-purple)', marginBottom: '10px' }}>{t('mentorGovtHelplineTitle')}</h4>
                <div style={{ display: 'grid', gap: '10px', marginBottom: '24px' }}>
                  {[
                    { label: t('mentorHelplineKiran'), num: '1800-599-0019' },
                    { label: t('mentorHelplineTele'), num: '14416' }
                  ].map(h => (
                    <div key={h.num} style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem' }}>{h.label}</span>
                      <button className="landing-btn" style={{ background: 'var(--color-teal)', color: '#fff', fontSize: '0.75rem', padding: '6px 12px' }} onClick={() => window.open(`tel:${h.num}`)}>Call</button>
                    </div>
                  ))}
                </div>
                <h4 style={{ color: 'var(--color-deep-purple)', marginBottom: '10px' }}>{t('mentorWhoTitle')}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
                  {[t('mentorWhoEdu'), t('mentorWhoCouns'), t('mentorWhoCareer'), t('mentorWhoVol')].map(w => (
                    <div key={w} style={{ fontSize: '0.8rem', padding: '8px', background: 'var(--color-cream)', borderRadius: '8px', border: '1px solid #f3f4f6' }}>{w}</div>
                  ))}
                </div>
                <h4 style={{ color: 'var(--color-deep-purple)', marginBottom: '10px' }}>{t('mentorAskTitle')}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {[t('mentorAsk1'), t('mentorAsk2'), t('mentorAsk3'), t('mentorAsk4')].map(a => (
                    <span key={a} style={{ background: '#f3f4f6', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem' }}>{a}</span>
                  ))}
                </div>
                <div className="data-list" style={{ marginTop: '24px' }}>
                  {actionModal.data?.map((m, i) => (
                    <div key={i} className="data-item" style={{ padding: '12px', background: '#fff', border: '1px solid #eee', borderRadius: '12px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>{m.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>{m.expertise?.join(', ')}</p>
                      </div>
                      <button className="landing-btn landing-btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Ask</button>
                    </div>
                  ))}
                </div>
                <p style={{ textAlign: 'center', marginTop: '20px', fontStyle: 'italic', color: 'var(--color-deep-purple)', fontSize: '0.85rem' }}>{t('mentorSafe')}</p>
              </div>
            )}

            {actionModal.type === 'jobs' && (
              <div className="jobs-view">
                <p style={{ fontWeight: '500', marginBottom: '20px', fontSize: '1rem' }}>{t('jobsSubtitle')}</p>
                <div style={{ background: 'var(--color-warm-beige)', padding: '16px', borderRadius: '15px', marginBottom: '24px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>{t('jobsWhatTitle')}</h4>
                  <p style={{ fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>{t('jobsWhatDesc')}</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ background: '#fef3c7', padding: '12px', borderRadius: '12px' }}>
                    <h5 style={{ margin: '0 0 6px 0', color: '#b45309', fontSize: '0.85rem' }}>{t('jobsInsideTitle')}</h5>
                    <ul style={{ paddingLeft: '12px', fontSize: '0.75rem', margin: 0 }}>
                      <li>{t('jobsInsideLocal')}</li>
                      <li>{t('jobsInsideDigital')}</li>
                    </ul>
                  </div>
                  <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '12px' }}>
                    <h5 style={{ margin: '0 0 6px 0', color: '#047857', fontSize: '0.85rem' }}>{t('jobsSkillsTitle')}</h5>
                    <ul style={{ paddingLeft: '12px', fontSize: '0.75rem', margin: 0 }}>
                      <li>{t('jobsSkill1')}</li>
                      <li>{t('jobsSkill2')}</li>
                    </ul>
                  </div>
                </div>
                <div className="data-list">
                  {actionModal.data?.map((opp, i) => (
                    <div key={i} className="data-item" style={{ padding: '12px', border: '1px solid #eee', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem' }}>{opp.title}</h4>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>{opp.company} • {opp.location}</p>
                      </div>
                      <button className="landing-btn landing-btn-primary" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>Apply</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
