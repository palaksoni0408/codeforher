const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema({
    mentorId: { type: String, unique: true },
    name: { type: String, required: true },
    expertise: [String],
    bio: String,
    avatar: String,
    availability: String,
    languages: [String]
})

module.exports = mongoose.model('Mentor', mentorSchema)
