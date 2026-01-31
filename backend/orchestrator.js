const EventModel = require('./models/Event')
const User = require('./models/User')

class EmpowermentOrchestrator {
  constructor() {
    this.eventHandlers = {
      skill_completed: this.handleSkillCompletion.bind(this),
      opportunity_saved: this.handleOpportunitySaved.bind(this),
      safety_module_completed: this.handleSafetyCompletion.bind(this)
    }
  }

  async emitEvent(eventName, userId, data) {
    console.log(`Event: ${eventName} from user ${userId}`)

    // Persist event
    try {
      await EventModel.create({ userId, eventType: eventName, data, module: data.module || null })
    } catch (e) {
      console.error('Failed to persist event', e)
    }

    // Call handler if exists
    if (this.eventHandlers[eventName]) {
      try {
        await this.eventHandlers[eventName](userId, data)
      } catch (e) {
        console.error('Handler error', e)
      }
    }
  }

  async handleSkillCompletion(userId, data) {
    const user = await User.findOne({ userId })
    if (!user) return

    const completed = (user.progress && user.progress.completed_skills) || []
    if (completed.length >= 3) {
      // For demo scaffolding, just log. Real implementation would call matching and notifications.
      console.log(`User ${userId} has ${completed.length} skills — trigger opportunity matching`)     
    }
  }

  async handleOpportunitySaved(userId, data) {
    const user = await User.findOne({ userId })
    if (!user) return

    const saved = user.saved_opportunities || []
    if (saved.length === 1) {
      // Suggest safety lesson
      console.log(`User ${userId} saved first opportunity — suggest workplace safety lesson`)
    }
  }

  async handleSafetyCompletion(userId, data) {
    // Award points as an example
    await User.updateOne({ userId }, { $inc: { 'progress.points': 20 } })
    console.log(`Awarded safety completion points to ${userId}`)
  }
}

module.exports = EmpowermentOrchestrator
