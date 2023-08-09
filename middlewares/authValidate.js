const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const login = async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (!username || !password) {
            req.session.error = 'Iltimos foydalanuvchi nomi va parolni kiriting'
            next()
            return
        }
        const usernameRegex = /^[a-z0-9_\.]+$/.exec(username)
        const existUser = await User.findOne({ username: username.trim() })

        if (!usernameRegex) {
            req.session.error = "Foydalanuvchi nomi kichik harflar, raqamlar, nuqta va pastki chiziqchadan iborat bo'lishi kerak"
            next()
            return
        }
        
        if (!existUser) {
            req.session.error = `Ushbu foydalanuvchi topilmadi`
            next()
            return
        }

        const comparedPass = await bcrypt.compare(password, existUser.password)

        if (!comparedPass) {
            req.session.error = "Iltimos parolni to'g'ri kiriting"
            next()
            return
        }
        next()
    } catch (error) {
        console.log(error);
    }  
}

const register = async (req, res, next) => {
    try {
        const { username, password, password2 } = req.body
        req.session.sessionData = { username }
    
        if (!username || !password || !password2) {
            req.session.error = 'Login va parol yarating!'
            res.redirect('/auth/register/new')
            return
        }
    
        const existUser = await User.findOne({ username })
    
        if (existUser) {
            req.session.error = 'Bunday loginga ega foydalanuvchi mavjud. Iltimos boshqa login kiriting'
            res.redirect('/auth/register/new')
            return
        }

        const usernameRegex = /^[a-z0-9_\.]+$/.exec(username)

        if (!usernameRegex) {
            req.session.error = "Foydalanuvchi nomi kichik harflar, raqamlar va pastki chiziqchadan iborat bo'lishi kerak"
            res.redirect('/auth/register/new')
            return
        }

        if (password !== password2) {
            req.session.error = 'Parollar mos emas'
            res.redirect('/auth/register/new')
            return
        }
    
        if (password.length < 6) {
            req.session.error = 'Parol kamida 6 belgidan iborat bo\'lishi kerak'
            res.redirect('/auth/register/new')
            return
        }

        const passHashSalt = await bcrypt.genSalt(12)
        const hashedPass = await bcrypt.hash(password, passHashSalt)

        req.session.authData.username = username
        req.session.authData.password = hashedPass

        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = { login, register }