const express = require('express')
const router = express.Router()
const controller = require('../controllers/shaktihController')

router.post('/legal-query', controller.handleLegalQuery)
router.get('/lesson/:lessonId', controller.getLesson)
router.post('/sos', controller.handleSOS)
router.get('/help-centers', controller.getHelpCenters)

module.exports = router
