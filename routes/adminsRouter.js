const { Router } = require('express')
const router = Router()

const {
    getAdminsPage,
    getAddAdmin
 } = require('../controllers/adminsController')

const { isAuth } = require('../middlewares/authCheck')

router.get('/', isAuth, getAdminsPage)
router.post('/new', isAuth, getAddAdmin)

module.exports = router