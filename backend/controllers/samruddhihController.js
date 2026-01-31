const Opportunity = require('../models/Opportunity')
const User = require('../models/User')
const Orchestrator = require('../orchestrator')
const orchestrator = new Orchestrator()

function computeMatchPercent(userSkills = [], requiredSkills = []) {
  if (!requiredSkills.length) return 75
  const lower = (arr) => arr.map(s => String(s).toLowerCase())
  const user = new Set(lower(userSkills))
  const req = lower(requiredSkills)
  const matched = req.filter(s => user.has(s) || req.some(r => r.includes(s) || s.includes(r)))
  return Math.min(100, Math.round((matched.length / req.length) * 100) + (user.size ? 10 : 0))
}

exports.listOpportunities = async (req, res) => {
  try {
    const userId = req.query.userId || 'demo_user'
    const user = await User.findOne({ userId }).lean()
    const userSkills = user?.progress?.completed_skills || []
    const opportunities = await Opportunity.find({ isActive: true }).lean()
    const matches = opportunities.map(opp => ({
      ...opp,
      matchPercent: computeMatchPercent(userSkills, opp.requiredSkills || [])
    }))
    res.json({ opportunities: matches, totalMatches: matches.length })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to load opportunities' })
  }
}

exports.matchOpportunities = async (req, res) => {
  const { userId } = req.body
  const user = await User.findOne({ userId: userId || 'demo_user' }).lean()
  const userSkills = user?.progress?.completed_skills || []
  const opportunities = await Opportunity.find({ isActive: true }).lean()
  const matches = opportunities.map(opp => ({
    ...opp,
    matchPercent: computeMatchPercent(userSkills, opp.requiredSkills || [])
  }))
  return res.json({ matches, totalMatches: matches.length, showing: matches.length })
}

exports.saveOpportunity = async (req, res) => {
  const { userId, opportunityId, status = 'interested' } = req.body
  const user = await User.findOne({ userId: userId || 'demo_user' })
  if (!user) return res.status(404).json({ error: 'user not found' })

  user.saved_opportunities = user.saved_opportunities || []
  if (!user.saved_opportunities.includes(opportunityId)) user.saved_opportunities.push(opportunityId)
  await user.save()

  orchestrator.emitEvent('opportunity_saved', user.userId, { opportunityId })

  return res.json({ saved: true, totalSaved: user.saved_opportunities.length, orchestrationTriggered: true })
}

exports.applyToOpportunity = async (req, res) => {
  const { userId, opportunityId } = req.body
  const user = await User.findOne({ userId: userId || 'demo_user' })
  if (!user) return res.status(404).json({ error: 'user not found' })

  user.applications = user.applications || []
  const already = user.applications.some(a => a.opportunityId === opportunityId)
  if (!already) user.applications.push({ opportunityId, status: 'applied' })
  await user.save()

  return res.json({ applied: true, totalApplications: user.applications.length })
}
