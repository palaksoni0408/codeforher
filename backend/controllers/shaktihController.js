const KnowledgeBase = require('../models/KnowledgeBase')

exports.handleLegalQuery = async (req, res) => {
  const { query } = req.body
  if (!query) return res.status(400).json({ error: 'query required' })

  // Very simple keyword search demo
  const keywords = query.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
  const match = await KnowledgeBase.findOne({ keywords: { $in: keywords } }).lean()

  if (match) {
    return res.json({ response: match.content, relatedTopics: match.relatedTopics || [] })
  }

  return res.json({ message: "Topic not covered yet", fallback: "Contact helpline: 181 (Women's Helpline)" })
}

exports.getLesson = async (req, res) => {
  const lessonId = req.params.lessonId
  // Placeholder response
  return res.json({ lesson: { id: lessonId, title: 'Sample Lesson', screens: [], quiz: [] }, userProgress: { completed: false, currentScreen: 0 } })
}
