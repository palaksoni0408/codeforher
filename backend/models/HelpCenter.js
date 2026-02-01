const mongoose = require('mongoose')

const helpCenterSchema = new mongoose.Schema({
    centerId: { type: String, unique: true },
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ['Legal Aid', 'Safe Shelter', 'Police Station', 'Healthcare', 'Women Helpline'],
        required: true
    },
    address: String,
    phone: String,
    location: {
        lat: Number,
        lng: Number
    },
    distance: String // Simulated for demo
})

module.exports = mongoose.model('HelpCenter', helpCenterSchema)
