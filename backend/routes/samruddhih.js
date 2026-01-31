const express = require('express')
const router = express.Router()
const controller = require('../controllers/samruddhihController')

router.get('/opportunities', controller.listOpportunities)
router.post('/match-opportunities', controller.matchOpportunities)
router.post('/save-opportunity', controller.saveOpportunity)
router.post('/apply', controller.applyToOpportunity)

module.exports = router
