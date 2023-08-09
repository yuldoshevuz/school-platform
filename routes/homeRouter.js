const { Router } = require('express')
const router = Router()
const { getHomePage, sendNewMessageToAdmin } = require('../controllers/homeController')

const express = require('express')

router.get('/', getHomePage)
router.post('/sendMessage', express.json(), sendNewMessageToAdmin)

module.exports = router