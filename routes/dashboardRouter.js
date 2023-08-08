const { Router } = require('express')
const router = Router()
const {
    getDashboardPage,
    sendNewMessageToAdmin
} = require('../controllers/dashboardController')

const { isAuth } = require('../middlewares/authCheck')

router.get('/', isAuth, getDashboardPage)

module.exports = router