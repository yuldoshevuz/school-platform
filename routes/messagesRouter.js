const { Router } = require('express')
const router = Router()

const { isAuth } = require('../middlewares/authCheck')

const {
    getMessagesPage,
    getMessagePageById
} = require('../controllers/messagesController')

router.get('/', isAuth, getMessagesPage)

router.get('/:id', isAuth, getMessagePageById)

module.exports = router