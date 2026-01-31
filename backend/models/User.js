const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  profile: { type: mongoose.Schema.Types.Mixed },
  preferences: { type: mongoose.Schema.Types.Mixed },
  progress: { type: mongoose.Schema.Types.Mixed },
  saved_opportunities: [String],
  applications: [mongoose.Schema.Types.Mixed],
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)
