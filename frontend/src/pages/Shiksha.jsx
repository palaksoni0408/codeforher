import React, { useEffect, useState } from 'react'
import { useDemo } from '../context/DemoContext'
import { BarChart } from '../components/Icon'
import ProgressBar from '../components/ProgressBar'
import USPSection from '../components/USPSection'
import MotivationalQuote from '../components/MotivationalQuote'
import { getShikshaQuote, wasQuoteShownThisSession, markQuoteAsShown } from '../motivationalContent'

const API_BASE = '/api/v1/shiksha'

export default function Shiksha() {
  const { user, completeCourse, dashboard, t } = useDemo()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [motivationalQuote, setMotivationalQuote] = useState(null)
  const userId = user?.userId || 'demo_user'
  const learningStreakDays = dashboard?.learningStreakDays ?? user?.progress?.learningStreakDays ?? 0
  const learnerRankPercent = dashboard?.learnerRankPercent ?? user?.progress?.learnerRankPercent

  function fetchCourses() {
    return fetch(`${API_BASE}/courses?userId=${userId}`)
      .then(r => r.json())
      .then(data => setCourses(data.courses || []))
      .catch(() => setCourses([]))
  }

  useEffect(() => {
    setLoading(true)
    fetchCourses().finally(() => setLoading(false))
  }, [userId])

  // Update motivational quote when courses change
  useEffect(() => {
    if (courses.length > 0 && !wasQuoteShownThisSession('shiksha')) {
      const quote = getShikshaQuote(courses)
      setMotivationalQuote(quote)
    }
  }, [courses])

  const handleQuoteDismiss = () => {
    markQuoteAsShown('shiksha')
    setMotivationalQuote(null)
  }

  async function handleStartOrContinue(course) {
    const current = course.percentComplete ?? 0
    if (current >= 100) return
    if (current === 0) {
      await completeCourse(course.courseId, undefined, 10)
    } else {
      const next = Math.min(100, current + 25)
      await completeCourse(course.courseId, next === 100 ? 85 : undefined, next)
    }
    fetchCourses()
  }

  return (
    <div className="skill-hub">
      <h1 className="page-title">{t('shiksha')}</h1>
      <p className="page-subtitle">{t('shikshaSubtitle')}</p>

      <div className="streak-card">
        <div className="streak-left">
          <BarChart size={24} />
          <span className="streak-label">{t('yourLearningStreak')}</span>
          <p className="streak-value">{learningStreakDays} <span className="streak-unit">{t('daysActive')}</span></p>
        </div>
        {learnerRankPercent != null && (
          <div className="streak-badge">{t('topLearners', { percent: learnerRankPercent })}</div>
        )}
      </div>

      <MotivationalQuote
        quote={motivationalQuote}
        variant="blue"
        onDismiss={handleQuoteDismiss}
      />

      <USPSection
        heading={t('uspShikshaHeading')}
        points={[
          t('uspShikshaPoint1'),
          t('uspShikshaPoint2'),
          t('uspShikshaPoint3'),
          t('uspShikshaPoint4')
        ]}
        variant="blue"
      />

      <section className="featured-courses">
        <h2 className="section-title">{t('featuredCourses')}</h2>
        {loading ? (
          <p className="loading">{t('loadingCourses')}</p>
        ) : (
          <div className="course-grid">
            {courses.map(course => {
              const percent = course.percentComplete ?? 0
              const isComplete = percent >= 100
              const isStarted = percent > 0
              return (
                <div key={course.courseId} className="course-card">
                  <div className="course-card-header" style={{ background: course.skill === 'Finance' ? 'var(--color-blue)' : 'var(--color-gray-light)' }} />
                  <div className="course-card-body">
                    <span className="course-category">{course.skill || 'Technology'}</span>
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-meta">{course.level} • {course.estimatedCompletion || `${course.duration} Weeks`}</p>
                    <ProgressBar
                      percent={percent}
                      label={isComplete ? t('complete') : isStarted ? t('percentComplete', { percent }) : t('notStarted')}
                      showLabel={true}
                    />
                    <button
                      type="button"
                      className={`btn ${isStarted ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => handleStartOrContinue(course)}
                      disabled={isComplete}
                    >
                      {isComplete ? t('completed') : isStarted ? t('continue') : t('startLearning')}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
