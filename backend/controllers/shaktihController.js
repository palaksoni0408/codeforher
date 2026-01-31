const KnowledgeBase = require('../models/KnowledgeBase')

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
