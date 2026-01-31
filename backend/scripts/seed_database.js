require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

const KnowledgeBase = require('../models/KnowledgeBase')
const User = require('../models/User')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/viyastree'

async function seed() {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to Mongo for seeding')

  // Load sample knowledge base
  const kbPath = path.join(__dirname, '..', '..', 'data', 'knowledge_base.json')
  if (fs.existsSync(kbPath)) {
    const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'))
    await KnowledgeBase.deleteMany({})
    await KnowledgeBase.insertMany(kb)
    console.log('Knowledge base seeded')
  } else {
    console.log('No knowledge_base.json found at', kbPath)
  }

  // Create demo user
  await User.deleteMany({ userId: 'demo_user' })
  await User.create({
    userId: 'demo_user',
    profile: { name: 'Priya (Demo User)', location: 'Raebareli' },
    preferences: { interests: ['tailoring', 'digital marketing'], workType: 'part-time' },
    progress: { level: 3, points: 250, completed_skills: ['tailoring_basic', 'excel_intermediate'], completed_lessons: [], badges: ['Level_3_Achiever'] },
    saved_opportunities: []
  })
  console.log('Demo user created')

  await mongoose.disconnect()
  console.log('Seed complete')
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
