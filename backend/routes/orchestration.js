const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.query.userId || 'demo_user'
    const user = await User.findOne({ userId }).lean()
    if (!user) return res.status(404).json({ error: 'user not found' })

    const progress = user.progress || {}
    const skillsLearned = (progress.completed_skills || []).length
    const jobsApplied = (user.applications || []).length
    const rightsKnown = progress.rightsKnownCount ?? 0
    const safetyScore = progress.safetyScore ?? 0
    const learningStreakDays = progress.learningStreakDays ?? 0
    const learnerRankPercent = progress.learnerRankPercent ?? null

    // Recommendations based on progress
    const recommendations = []
    if (skillsLearned < 3) recommendations.push({ message: 'Complete 2 more skills to unlock job matching', type: 'skill' })
    if (jobsApplied < 1 && skillsLearned >= 1) recommendations.push({ message: 'Apply to opportunities that match your skills', type: 'livelihood' })
    if (rightsKnown < 5) recommendations.push({ message: 'Learn about your legal rights in Shaktih', type: 'safety' })
    if (recommendations.length === 0) recommendations.push({ message: 'You\'re on track! Keep building your empowerment loop.', type: 'general' })

    const nextSteps = []
    if (progress.courseProgress) {
      const inProgress = Object.entries(progress.courseProgress).find(([_, p]) => p > 0 && p < 100)
      if (inProgress) nextSteps.push({ action: 'continue_course', courseId: inProgress[0], label: 'Continue your course' })
    }
    nextSteps.push({ action: 'explore_opportunities', label: 'Browse livelihood opportunities' })

    res.json({
      userId,
      profile: user.profile,
      skillsLearned,
      jobsApplied,
      rightsKnown,
      safetyScore,
      learningStreakDays,
      learnerRankPercent,
      empowermentScore: Math.min(100, Math.round((skillsLearned * 10 + jobsApplied * 5 + rightsKnown * 3 + safetyScore * 0.3) / 2)),
      recommendations,
      recentActivity: [],
      nextSteps
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to load dashboard' })
  }
})

module.exports = router
