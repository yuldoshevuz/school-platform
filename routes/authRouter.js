const { Router } = require('express')
const router = Router()
const {
    getLoginPage,
    getLogin,
    getLogout,
    getConfirmToken,
    getRegisterPage,
    getRegister,
    getRegisterConfirmPage,
    getRegisterConfirm,
    getRegisterNewUserPage,
    getRegisterNewUser
} = require('../controllers/authController')

const { isntAuth } = require('../middlewares/authCheck')
const authValidate = require('../middlewares/authValidate')

router.get('/', isntAuth, getLoginPage)

router.get('/login', isntAuth, getLoginPage)

router.post('/login', isntAuth, authValidate.login, getLogin)

router.get('/logout', getLogout)

router.get('/confirm/:id', isntAuth, getConfirmToken)

router.get('/register', isntAuth, getRegisterPage)

router.post('/register', isntAuth, getRegister)

router.get('/register/confirm', isntAuth, getRegisterConfirmPage)

router.post('/register/confirm', isntAuth, getRegisterConfirm)

router.get('/register/new', isntAuth, getRegisterNewUserPage)

router.post('/register/new', isntAuth, authValidate.register, getRegisterNewUser)

module.exports = router