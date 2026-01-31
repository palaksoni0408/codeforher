import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, t } = useDemo()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    signup({ name, email })
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">V</div>
        </div>
        <LanguageSwitcher className="auth-lang" />
        <h2 className="auth-title">{t('createAccount')}</h2>
        <p className="auth-subtitle">{t('joinToday')}</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">{t('fullName')}</label>
          <div className="auth-input-wrap">
            <span className="auth-input-icon" aria-hidden>👤</span>
            <input
              type="text"
              placeholder="Palak"
              value={name}
              onChange={e => setName(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <label className="auth-label">{t('emailAddress')}</label>
          <div className="auth-input-wrap">
            <span className="auth-input-icon" aria-hidden>✉</span>
            <input
              type="email"
              placeholder="palak@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <label className="auth-label">{t('password')}</label>
          <div className="auth-input-wrap">
            <span className="auth-input-icon" aria-hidden>🔒</span>
            <input
              type="password"
              placeholder={t('createStrongPassword')}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <button type="submit" className="auth-submit">{t('signUp')}</button>
        </form>

        <p className="auth-footer">
          {t('alreadyHaveAccount')} <Link to="/login" className="auth-link">{t('logIn')}</Link>
        </p>
        <Link to="/" className="auth-back">{t('backToHome')}</Link>
      </div>
    </div>
  )
}
