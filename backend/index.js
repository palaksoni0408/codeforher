console.log('--- VIYASTREE BACKEND STARTING ---')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/viyastree'
const PORT = process.env.PORT || 5000

// Routes
app.use('/api/v1/shaktih', require('./routes/shaktih'))
app.use('/api/v1/shiksha', require('./routes/shiksha'))
app.use('/api/v1/samruddhih', require('./routes/samruddhih'))
app.use('/api/v1/orchestration', require('./routes/orchestration'))

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB')
}).catch(err => {
  console.error('Mongo connection error (falling back to demo data mode):', err.message)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app
