import React, { useState } from 'react'
import { useDemo } from '../context/DemoContext'
import Button from '../components/Button'
import USPSection from '../components/USPSection'
import MotivationalQuote from '../components/MotivationalQuote'
import { motivationalQuotes, wasQuoteShownThisSession, markQuoteAsShown } from '../motivationalContent'

function formatAnswer(j) {
  if (!j) return ''
  if (j.error && j.message) return `Error: ${j.message}`
  if (j.response) {
    const c = j.response
    if (typeof c === 'string') return c
    const parts = []
    if (c.summary) parts.push(c.summary)
    if (c.keyPoints && c.keyPoints.length) parts.push('\nKey points:\n• ' + c.keyPoints.join('\n• '))
    if (c.lawReference) parts.push('\nLaw: ' + c.lawReference)
    return parts.join('\n\n') || JSON.stringify(c, null, 2)
  }
  if (j.message) return j.message + (j.fallback ? '\n\n' + j.fallback : '')
  return JSON.stringify(j, null, 2)
}

export default function Shaktih() {
  const [answer, setAnswer] = useState(null)
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQuote, setShowQuote] = useState(!wasQuoteShownThisSession('shaktih'))
  const { askLegalQuery, t } = useDemo()

  const handleQuoteDismiss = () => {
    markQuoteAsShown('shaktih')
    setShowQuote(false)
  }

  async function ask() {
    const trimmed = q.trim()
    if (!trimmed) {
      setAnswer(t('enterQuestion'))
      return
    }
    setLoading(true)
    setAnswer(null)
    try {
      const j = await askLegalQuery(trimmed)
      setAnswer(formatAnswer(j))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="shaktih-page">
      <h2>{t('shaktih')}</h2>

      <MotivationalQuote
        quote={showQuote ? motivationalQuotes.shaktih.sectionIntro : null}
        variant="purple"
        onDismiss={handleQuoteDismiss}
      />

      <USPSection
        heading={t('uspShaktihHeading')}
        points={[
          t('uspShaktihPoint1'),
          t('uspShaktihPoint2'),
          t('uspShaktihPoint3'),
          t('uspShaktihPoint4')
        ]}
        variant="purple"
      />

      <section className="card" aria-labelledby="shaktih-ask">
        <label id="shaktih-ask" style={{ display: 'block', marginBottom: 8 }}>
          {t('askRightsLabel')}
        </label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            aria-label="Legal question"
            placeholder={t('askPlaceholder')}
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && ask()}
            style={{ flex: 1 }}
            disabled={loading}
          />
          <Button onClick={ask} aria-label={t('ask')} disabled={loading}>
            {loading ? '…' : t('ask')}
          </Button>
        </div>
        {answer != null && (
          <div className="shaktih-answer" style={{ marginTop: 12 }}>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{answer}</pre>
          </div>
        )}
      </section>
    </main>
  )
}
