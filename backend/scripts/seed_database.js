require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

const KnowledgeBase = require('../models/KnowledgeBase')
const User = require('../models/User')
const Course = require('../models/Course')
const Opportunity = require('../models/Opportunity')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/viyastree'

const defaultCourses = [
  { courseId: 'digital_literacy_basics', title: 'Digital Literacy Basics', skill: 'Technology', level: 'Beginner', duration: 2, estimatedCompletion: '2 Weeks', syllabus: ['Intro', 'Devices', 'Internet', 'Safety'] },
  { courseId: 'financial_independence_101', title: 'Financial Independence 101', skill: 'Finance', level: 'Intermediate', duration: 4, estimatedCompletion: '4 Weeks', syllabus: ['Budgeting', 'Savings', 'Banking', 'Investing'] },
  { courseId: 'advanced_embroidery', title: 'Advanced Embroidery', skill: 'Craft', level: 'Advanced', duration: 6, estimatedCompletion: '6 Weeks', syllabus: ['Stitches', 'Designs', 'Selling'] }
]

const defaultOpportunities = [
  { opportunityId: 'opp_handicraft', title: 'Handicraft Artisan', organization: 'Local Co-op', location: 'Local / Remote', workType: 'Part-time', requiredSkills: ['Embroidery', 'Design', 'Creativity'], salary: { min: 8000, max: 12000, unit: 'month' }, isActive: true },
  { opportunityId: 'opp_digital_marketing', title: 'Digital Marketing Assistant', organization: 'StartUp India', location: 'Remote', workType: 'Internship', requiredSkills: ['Digital Literacy', 'Social Media', 'Writing'], salary: { type: 'Profi Share' }, isActive: true },
  { opportunityId: 'opp_finance', title: 'Finance Support Associate', organization: 'Women First', location: 'Hybrid', workType: 'Full-time', requiredSkills: ['Financial Literacy', 'Excel', 'Communication'], salary: { min: 15000, max: 20000, unit: 'month' }, isActive: true }
]

async function seed() {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to Mongo for seeding')

  const kbPath = path.join(__dirname, '..', '..', 'data', 'knowledge_base.json')
  if (fs.existsSync(kbPath)) {
    const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'))
    await KnowledgeBase.deleteMany({})
    await KnowledgeBase.insertMany(kb)
    console.log('Knowledge base seeded')
  }

  await Course.deleteMany({})
  await Course.insertMany(defaultCourses)
  console.log('Courses seeded')

  await Opportunity.deleteMany({})
  for (const o of defaultOpportunities) {
    await Opportunity.create({ ...o, postedDate: new Date() })
  }
  console.log('Opportunities seeded')

  const today = new Date().toISOString().slice(0, 10)
  await User.deleteMany({ userId: 'demo_user' })
  await User.create({
    userId: 'demo_user',
    profile: { name: 'Palak', location: 'Raebareli', email: 'palak@example.com' },
    preferences: { interests: ['tailoring', 'digital marketing'], workType: 'part-time' },
    progress: {
      level: 3,
      points: 250,
      completed_skills: ['tailoring_basic', 'excel_intermediate'],
      completed_lessons: [],
      badges: ['Level_3_Achiever'],
      courseProgress: { financial_independence_101: 10 },
      learningStreakDays: 12,
      lastActiveDate: today,
      safetyScore: 98,
      rightsKnownCount: 12,
      learnerRankPercent: 5
    },
    saved_opportunities: [],
    applications: []
  })
  console.log('Demo user created')

  await mongoose.disconnect()
  console.log('Seed complete')
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
