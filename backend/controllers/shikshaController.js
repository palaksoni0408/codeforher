const Course = require('../models/Course')
const User = require('../models/User')
const Mentor = require('../models/Mentor')
const Orchestrator = require('../orchestrator')
const orchestrator = new Orchestrator()

exports.generatePath = async (req, res) => {
  const { interests = [], currentLevel = 'beginner', timeAvailable = 5 } = req.body
  // Minimal stub: return empty path for scaffolding
  return res.json({ learningPath: [], totalEstimatedTime: '0 weeks' })
}

exports.updateProgress = async (req, res) => {
  const { userId, courseId, action, quizScore, percentComplete } = req.body
  const user = await User.findOne({ userId: userId || 'demo_user' })
  if (!user) return res.status(404).json({ error: 'user not found' })

  user.progress = user.progress || {}
  user.progress.courseProgress = user.progress.courseProgress || {}
  if (typeof percentComplete === 'number') {
    user.progress.courseProgress[courseId] = Math.min(100, Math.max(0, percentComplete))
    if (user.progress.courseProgress[courseId] >= 100) {
      user.progress.completed_skills = Array.from(new Set([...(user.progress.completed_skills || []), courseId]))
    }
  }

  let pointsEarned = 0
  if (quizScore >= 80) pointsEarned = 50
  else if (quizScore >= 60) pointsEarned = 30
  if (action === 'complete' && quizScore != null) {
    user.progress.points = (user.progress.points || 0) + pointsEarned
    user.progress.completed_skills = Array.from(new Set([...(user.progress.completed_skills || []), courseId]))
    user.progress.courseProgress[courseId] = 100
    orchestrator.emitEvent('skill_completed', user.userId, { skill: courseId, pointsEarned })
  }

  // Update streak: lastActiveDate to today
  const today = new Date().toISOString().slice(0, 10)
  const last = user.progress.lastActiveDate ? user.progress.lastActiveDate.slice(0, 10) : null
  if (last !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    user.progress.learningStreakDays = last === yesterday ? (user.progress.learningStreakDays || 0) + 1 : 1
    user.progress.lastActiveDate = today
  }

  await user.save()

  return res.json({
    pointsEarned,
    totalPoints: user.progress.points,
    percentComplete: user.progress.courseProgress[courseId],
    learningStreakDays: user.progress.learningStreakDays,
    levelUp: false,
    orchestrationTriggered: action === 'complete'
  })
}

exports.getCourse = async (req, res) => {
  const courseId = req.params.courseId
  const userId = req.query.userId || 'demo_user'
  const course = await Course.findOne({ courseId }).lean()
  const user = await User.findOne({ userId }).lean()
  const percentComplete = user?.progress?.courseProgress?.[courseId] ?? 0
  if (!course) return res.status(404).json({ error: 'course not found' })
  return res.json({ course: { ...course, percentComplete } })
}

exports.listCourses = async (req, res) => {
  const userId = req.query.userId || 'demo_user'
  const courses = await Course.find({}).lean()
  const user = await User.findOne({ userId }).lean()
  const courseProgress = user?.progress?.courseProgress || {}
  const list = courses.map(c => ({
    ...c,
    percentComplete: courseProgress[c.courseId] ?? 0
  }))
  res.json({ courses: list })
}

exports.listMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find({}).lean()
    if (mentors.length === 0) {
      return res.json({
        mentors: [
          { name: "Dr. Anjali Verma", expertise: ["👩‍⚕️ Certified Counselor", "Mental Health"], bio: "Expert in emotional support and stress management.", availability: "Mon-Wed, 4pm-6pm" },
          { name: "Suman Rao", expertise: ["👩‍💼 Career Mentor", "Small Business"], bio: "Helped 500+ women start micro-businesses in rural areas.", availability: "Tue-Fri, 10am-12pm" },
          { name: "Prof. Savita Devi", expertise: ["👩‍🏫 Govt School Educator", "Education"], bio: "30+ years of teaching experience in primary and secondary education.", availability: "Weekends, 11am-1pm" },
          { name: "Meera Nair", expertise: ["🤝 Women Support Volunteer", "Legal Info"], bio: "Passionate about providing safety and legal awareness information.", availability: "24/7 (Emergency Help)" }
        ]
      })
    }
    return res.json({ mentors })
  } catch (err) {
    return res.status(500).json({ error: 'failed to load mentors' })
  }
}

