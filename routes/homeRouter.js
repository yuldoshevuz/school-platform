const { Router } = require('express')
const router = Router()
const { getHomePage, sendNewMessageToAdmin } = require('../controllers/homeController')

router.get('/', getHomePage)
router.post('/send_message', sendNewMessageToAdmin)

module.exports = router