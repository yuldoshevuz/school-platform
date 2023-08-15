const User = require('../models/userModel')
const Token = require('../models/adminTokenModel')

const { sendMail, randomCodeGenerate } = require('../utils/sendEmail')

const getLoginPage = (req, res) => {
    res.render('auth/login', {
        layout: 'auth-layout',
        isLogin: true,
        title: 'Kabinetga kirish',
        error: req.session.error,
        loginVal: req.session.loginVal || ''
    })

    delete req.session.error
    delete req.session.loginVal
}

const getLogin = async (req, res) => {
    try {
        if (req.session.error) {
            req.session.loginVal = req.body.username
            res.redirect('/auth/login')
            return
        }

        const user = await User.findOne({ username: req.body.username })
        
        req.session.user = user
        req.session.auth = true

        req.session.save(err => {
            if (err) throw err
            res.redirect('/dashboard')
        })
    } catch (error) {
        console.log(error);
    }
}

const getLogout = (req, res) => {
    try {
        if (req.session.auth && req.session.user) {
            delete req.session.auth
            delete req.session.user
        }
        res.redirect('/auth/login')
    } catch (error) {
        console.log(error);
    }
}

const getConfirmToken = async (req, res) => {
    try {
        const token = await Token.findOne({ token: req.params.id })
    
        if (!token) {
            res.redirect('/')
            return
        }
    
        if (!token.active) {
            res.redirect('/')
            return
        }

        console.log(token);

        req.session.confirmToken = true
        req.session.token = token
        res.redirect('/auth/register')
    } catch (error) {
        console.log(error);
    }
}

const getRegisterPage = (req, res) => {
    if (!req.session.confirmToken) {
        res.redirect('/auth/login')
        return
    }
    if (req.session.successRegisterPage) {
        res.redirect('/auth/register/confirm')
        return
    }
    if (req.session.successRegisterConfirm) {
        res.redirect('/auth/register/new')
        return
    }

    res.render('auth/register', {
        title: "Ro'yxatdan o'tish",
        layout: 'auth-layout',
        error: req.session.error,
        sessionData: req.session.sessionData || ''
    })

    delete req.session.error
    delete req.session.sessionData
}

const getRegister = async (req, res) => {
    try {
        
        if (!req.session.confirmToken) {
            res.redirect('/auth/login')
            return
        }

        const { full_name, email } = req.body
    
        req.session.sessionData = { full_name, email }
    
        if (!full_name || !email) {
            req.session.error = "Iltimos barcha maydonlarni to'ldiring"
            res.redirect('/auth/register')
            return
        }
        
        const existUser = await User.findOne({ email })
    
        if (existUser) {
            req.session.error = 'Bunday elektron pochtaga ega foydalanuvchi allaqachon mavjud. Iltimos boshqa email\'dan foydalaning'
            res.redirect('/auth/register')
            return
        }
    
        req.session.authData = {
            full_name,
            email,
            code: randomCodeGenerate()
        }

        await sendMail(req.session.authData.email,
            "Email'ni tasdiqlash",
            `<h1>Email tasdiqlash uchun kod: ${req.session.authData.code}`
        )
        
        delete req.session.confirmToken
        req.session.successRegisterPage = true
        res.redirect('/auth/register/confirm')
    } catch (error) {
        console.log(error);
    }
}

const getRegisterConfirmPage = (req, res) => {
    if (!req.session.successRegisterPage) {
        res.redirect('/auth/login')
        return
    }
    if (req.session.successRegisterConfirm) {
        res.redirect('/auth/register/new')
    }
    
    res.render('auth/register-confirm-code', {
        title: "Email'ni tasdiqlash",
        layout: 'auth-layout',
        error: req.session.error,
        authData: req.session.authData
    })

    delete req.session.error
}

const getRegisterConfirm = async (req, res) => {
    try {

        if (!req.session.successRegisterPage) {
            res.redirect('/auth/login')
            return
        }

        const { code } = req.body
    
        if (!code) {
            req.session.error = 'Iltimos kodni kiriting!'
        }
    
        if (+code !== req.session.authData.code) {
            req.session.error = 'Kod xato!'
            res.redirect('/auth/register/confirm')
            return
        }
    
        delete req.session.successRegisterPage
        req.session.successRegisterConfirm = true
        res.redirect('/auth/register/new')
    } catch (error) {
        console.log(error);
    }

}

const getRegisterNewUserPage = (req, res) => {
    if (!req.session.successRegisterConfirm) {
        res.redirect('/auth/login')
        return
    }

    res.render('auth/register-completed', {
        title: "Login va parol yaratish",
        layout: 'auth-layout',
        error: req.session.error,
        sessionData: req.session.sessionData
    })

    delete req.session.error
    delete req.session.sessionData
}

const getRegisterNewUser = async (req, res) => {
    try {
        if (!req.session.successRegisterConfirm) {
            res.redirect('/auth/login')
            return
        }

        const { username, password, email, full_name } = req.session.authData
        const userLength = (await User.find()).length
        const token = await Token.findOne({ token: req.session.token.token })

        const newUser = {
            id: userLength + 1,
            username, password,
            email, full_name,
            created_user: token.created_admin
        }
    
        User.create(newUser)
        await Token.findOneAndUpdate({ token: req.session.token.token }, { active: false })
        delete req.session.successRegisterConfirm
        delete req.session.token
        delete req.session.authData
        delete req.session.sessionData
        // delete req.session.confirmToken
        res.redirect('/auth/login')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
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
}