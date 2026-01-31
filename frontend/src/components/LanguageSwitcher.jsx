import React from 'react'
import { useDemo } from '../context/DemoContext'

export default function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage, t } = useDemo()
  return (
    <div className={`language-switcher ${className}`} role="group" aria-label="Choose language">
      <button
        type="button"
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label="English"
      >
        {t('langEn')}
      </button>
      <span className="lang-sep" aria-hidden>|</span>
      <button
        type="button"
        className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
        onClick={() => setLanguage('hi')}
        aria-pressed={language === 'hi'}
        aria-label="Hindi"
      >
        {t('langHi')}
      </button>
    </div>
  )
}
