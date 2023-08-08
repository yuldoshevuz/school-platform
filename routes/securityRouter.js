const { Router } = require('express')
const router = Router()

const {
    getSecurityPage,
    updateProfileData,
    changeEmail,
    cancelUpdateProfile,
    changePasswordPage,
    changePassword
} = require('../controllers/securityController')
const { isAuth } = require('../middlewares/authCheck')
const { updateValidate } = require('../middlewares/updateProfileCheck')

router.get('/', isAuth, getSecurityPage)

router.post('/updateProfile', isAuth, updateValidate, updateProfileData)

router.post('/updateProfile/email', isAuth, changeEmail)

router.get('/updateProfile/cancel', isAuth, cancelUpdateProfile)

router.get('/changePassword', isAuth, changePasswordPage)

router.post('/updatePassword', isAuth, changePassword)

module.exports = router