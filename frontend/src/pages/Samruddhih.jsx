import React, { useEffect, useState } from 'react'
import { useDemo } from '../context/DemoContext'
import { Folder, Search } from '../components/Icon'
import Button from '../components/Button'
import USPSection from '../components/USPSection'
import MotivationalQuote from '../components/MotivationalQuote'
import { getSamruddhihQuote, wasQuoteShownThisSession, markQuoteAsShown } from '../motivationalContent'

const API_BASE = '/api/v1/samruddhih'

function formatSalary(salary) {
  if (!salary) return '—'
  if (salary.type) return salary.type
  const { min, max, unit = 'month' } = salary
  if (min != null && max != null) return `₹${min.toLocaleString()}-₹${max.toLocaleString()}/${unit}`
  if (min != null) return `₹${min.toLocaleString()}/${unit}`
  return '—'
}

export default function Samruddhih() {
  const { user, applyToOpportunity, t } = useDemo()
  const [opportunities, setOpportunities] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [motivationalQuote, setMotivationalQuote] = useState(null)
  const [justApplied, setJustApplied] = useState(false)
  const userId = user?.userId || 'demo_user'
  const appliedIds = (user?.applications || []).map(a => typeof a === 'string' ? a : a.opportunityId)
  const applicationCount = appliedIds.length

  useEffect(() => {
    fetch(`${API_BASE}/opportunities?userId=${userId}`)
      .then(r => r.json())
      .then(data => setOpportunities(data.opportunities || []))
      .catch(() => setOpportunities([]))
      .finally(() => setLoading(false))
  }, [userId])

  // Update motivational quote based on application status
  useEffect(() => {
    if (!wasQuoteShownThisSession('samruddhih')) {
      const quote = getSamruddhihQuote(applicationCount, justApplied)
      setMotivationalQuote(quote)
    }
  }, [applicationCount, justApplied])

  const handleQuoteDismiss = () => {
    markQuoteAsShown('samruddhih')
    setMotivationalQuote(null)
  }

  async function handleApply(opp) {
    await applyToOpportunity(opp.opportunityId)
    setJustApplied(true)
    // Reset justApplied after showing the quote
    setTimeout(() => setJustApplied(false), 3000)
  }

  const filtered = opportunities.filter(o =>
    !search || [o.title, o.organization, ...(o.requiredSkills || [])].some(s => String(s).toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="livelihood">
      <div className="livelihood-header">
        <div>
          <h1 className="page-title">{t('samruddhih')}</h1>
          <p className="page-subtitle">{t('samruddhihSubtitle')}</p>
        </div>
        <button type="button" className="btn btn-primary">
          <Folder size={18} />
          {t('viewMyApplications')}
        </button>
      </div>

      <MotivationalQuote
        quote={motivationalQuote}
        variant="green"
        onDismiss={handleQuoteDismiss}
      />

      <USPSection
        heading={t('uspSamruddhihHeading')}
        points={[
          t('uspSamruddhihPoint1'),
          t('uspSamruddhihPoint2'),
          t('uspSamruddhihPoint3'),
          t('uspSamruddhihPoint4')
        ]}
        variant="green"
      />

      <div className="search-bar">
        <Search size={20} />
        <input
          type="search"
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
          aria-label="Search opportunities"
        />
        <button type="button" className="filter-btn" aria-label="Filter">▾</button>
      </div>

      {loading ? (
        <p className="loading">{t('loadingOpportunities')}</p>
      ) : (
        <div className="opportunity-grid">
          {filtered.map(opp => {
            const applied = appliedIds.includes(opp.opportunityId)
            const locationType = [opp.location, opp.workType].filter(Boolean).join(' • ')
            return (
              <div key={opp.opportunityId} className="opp-card">
                <div className="opp-card-top">
                  <div className="opp-avatar">{opp.title?.charAt(0) || 'O'}</div>
                  <span className="opp-match">{t('match', { percent: opp.matchPercent ?? 0 })}</span>
                </div>
                <h3 className="opp-title">{opp.title}</h3>
                <p className="opp-meta">{locationType || '—'}</p>
                <div className="opp-skills">
                  {(opp.requiredSkills || []).slice(0, 4).map(s => (
                    <span key={s} className="opp-skill-tag">{s}</span>
                  ))}
                </div>
                <p className="opp-salary">{formatSalary(opp.salary)}</p>
                <Button
                  className="btn btn-opp-apply"
                  onClick={() => handleApply(opp)}
                  disabled={applied}
                  aria-label={applied ? t('applied') : `Apply to ${opp.title}`}
                >
                  {applied ? t('applied') : t('applyNow')}
                </Button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
