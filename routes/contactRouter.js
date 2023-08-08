const { Router } = require('express')
const router = Router()
const { getContactPage } = require('../controllers/contactController')

router.get('/contact', getContactPage)

module.exports = router