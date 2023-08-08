const { Router } = require('express')
const router = Router()
const { getAboutPage } = require('../controllers/aboutController')

router.get('/about', getAboutPage)

module.exports = router