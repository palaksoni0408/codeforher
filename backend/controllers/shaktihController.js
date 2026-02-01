const KnowledgeBase = require('../models/KnowledgeBase')
const HelpCenter = require('../models/HelpCenter')
const Orchestrator = require('../orchestrator')
const orchestrator = new Orchestrator()

exports.handleLegalQuery = async (req, res) => {
  try {
    const { query } = req.body || {}
    const trimmed = typeof query === 'string' ? query.trim() : ''
    if (!trimmed) {
      return res.status(400).json({ error: 'query required', message: 'Please enter a question.' })
    }

    // Very simple keyword search demo
    const keywords = trimmed.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
    if (keywords.length === 0) {
      return res.status(400).json({ error: 'invalid query', message: 'Please enter a valid question.' })
    }

    const match = await KnowledgeBase.findOne({ keywords: { $in: keywords } }).lean()

    if (match) {
      return res.json({ response: match.content, relatedTopics: match.relatedTopics || [] })
    }

    return res.json({ message: "Topic not covered yet", fallback: "Contact helpline: 181 (Women's Helpline)" })
  } catch (err) {
    console.error('Shaktih legal-query error:', err)
    return res.status(500).json({
      error: 'server_error',
      message: 'Unable to process your question. Please try again or contact helpline: 181 (Women\'s Helpline).'
    })
  }
}

exports.getLesson = async (req, res) => {
  const lessonId = req.params.lessonId
  // Placeholder response
  return res.json({ lesson: { id: lessonId, title: 'Sample Lesson', screens: [], quiz: [] }, userProgress: { completed: false, currentScreen: 0 } })
}

exports.handleSOS = async (req, res) => {
  const { userId, location } = req.body
  console.log(`🚨 SOS ALERT: User ${userId} triggered an emergency at`, location)

  // In a real app, this would trigger SMS/Push notifications to emergency contacts/authorities
  orchestrator.emitEvent('sos_alert', userId || 'demo_user', { location })

  return res.json({
    success: true,
    message: 'SOS Alert sent to emergency contacts and nearby help centers.',
    timestamp: new Date().toISOString()
  })
}

exports.getHelpCenters = async (req, res) => {
  try {
    const centers = await HelpCenter.find({}).lean()
    // If empty, return some defaults for the demo
    if (centers.length === 0) {
      return res.json({
        centers: [
          { name: "Local Police Station (Women's Desk)", type: "👮‍♀️ Police Station", address: "Central Market Sq.", phone: "112", distance: "0.8 km" },
          { name: "Government Civil Hospital & PHC", type: "🏥 Hospital", address: "Greenwood Avenue", phone: "108", distance: "1.2 km" },
          { name: "Sakhi One Stop Centre (OSC)", type: "🏠 Women Help Desk", address: "Sector 12, Civil Lines", phone: "181", distance: "2.1 km" },
          { name: "Aashray NGO Support Center", type: "🧕 NGO Support", address: "Heritage Colony Road", phone: "011-4567-890", distance: "3.5 km" }
        ]
      })
    }
    return res.json({ centers })
  } catch (err) {
    return res.status(500).json({ error: 'failed to load help centers' })
  }
}

