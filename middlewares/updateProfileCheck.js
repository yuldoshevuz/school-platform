const User = require('../models/userModel')

const updateValidate = async (req, res, next) => {
    const { full_name, username, email, code } = req.body
    const user = req.session.user

    req.session.sessionData = { full_name, username, email, code }
    req.session.sessionData.errors = {}
    
    if (!full_name || !username || !email) {
        req.session.error = "Barcha maydonlarni to'ldiring"

        if(!full_name) {
            req.session.sessionData.errors.fullNameErr = true
        }
        if(!username) {
            req.session.sessionData.errors.usernameErr = true
        }
        if(!email) {
            req.session.sessionData.errors.emailErr = true
        }
        
        next()
        return
    }

    if (full_name === user.full_name && username === user.username && email === user.email) {
        req.session.error = 'Siz hali o\'zgartirish kiritmadingiz'
        next()
        return
    }

    const existUser = await User.findOne({ username })

    if (existUser) {
        req.session.error = "Bunday loginga ega foydalanuvchi mavjud. Iltimos boshqa login kiriting"
        req.session.sessionData.errors.usernameErr = true
        next()
        return
    }

    req.session.newData = {
        full_name, username, email
    }

    next()
}

module.exports = { updateValidate }