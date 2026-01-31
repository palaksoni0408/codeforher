const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  profile: { type: mongoose.Schema.Types.Mixed },
  preferences: { type: mongoose.Schema.Types.Mixed },
  progress: {
    type: mongoose.Schema.Types.Mixed,
    default: () => ({
      level: 1,
      points: 0,
      completed_skills: [],
      completed_lessons: [],
      badges: [],
      courseProgress: {}, // { courseId: percentComplete 0-100 }
      learningStreakDays: 0,
      lastActiveDate: null, // ISO date string for streak calc
      safetyScore: 0, // 0-100
      rightsKnownCount: 0,
      learnerRankPercent: null // e.g. 5 = top 5%
    })
  },
  saved_opportunities: [String],
  applications: [{ opportunityId: String, appliedAt: { type: Date, default: Date.now }, status: String }],
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)
