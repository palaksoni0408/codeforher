const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  userId: String,
  eventType: String,
  module: String,
  data: mongoose.Schema.Types.Mixed,
  triggeredActions: [mongoose.Schema.Types.Mixed],
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Event', EventSchema)
