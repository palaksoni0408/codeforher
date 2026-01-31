const Opportunity = require('../models/Opportunity')
const User = require('../models/User')
const Orchestrator = require('../orchestrator')
const orchestrator = new Orchestrator()

exports.matchOpportunities = async (req, res) => {
  const { userId } = req.body
  // Return empty list stub for scaffolding
  return res.json({ matches: [], totalMatches: 0, showing: 0 })
}

exports.saveOpportunity = async (req, res) => {
  const { userId, opportunityId, status = 'interested' } = req.body
  const user = await User.findOne({ userId: userId || 'demo_user' })
  if (!user) return res.status(404).json({ error: 'user not found' })

  user.saved_opportunities = user.saved_opportunities || []
  if (!user.saved_opportunities.includes(opportunityId)) user.saved_opportunities.push(opportunityId)
  await user.save()

  // Emit event; orchestrator may notify if first saved
  orchestrator.emitEvent('opportunity_saved', user.userId, { opportunityId })

  return res.json({ saved: true, totalSaved: user.saved_opportunities.length, orchestrationTriggered: true })
}
