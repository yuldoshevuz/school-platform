const bcrypt = require('bcrypt')
const { sendMail, randomCodeGenerate } = require('../utils/sendEmail')

const User = require('../models/userModel')

const getSecurityPage = (req, res) => {
    res.render('dashboard/security', {
        title: 'Xavfsizlik sozlamalari',
        layout: 'dashboard-layout',
        isSecurityPage: true,
        user: req.session.user,
        error: req.session.error,
        sessionData: req.session.sessionData
    })
    delete req.session.error

}

const changeEmail = async (req, res) => {
    try {
        const { code } = req.body
        
        if (!code) {
            req.session.error = 'Kodni kiriting!'
            req.session.sessionData.errors.codeErr = true
            res.redirect('/dashboard/security')
            return
        }

        if (+code === req.session.sessionData.confirmCode) {
            const newData = {
                full_name: req.session.newData.full_name,
                username: req.session.newData.username,
                email: req.session.newData.email
            }
            const updatedUser = await User.findByIdAndUpdate(req.session.user._id, newData)
            delete req.session.newData
            delete req.session.user
            req.session.sessionData.success = "Profil muvaffaqiyatli o'zgartirildi"
            delete req.session.sessionData
            res.redirect('/dashboard/security')
            return
        }
        req.session.error = 'Kode xato kiritildi'
        req.session.sessionData.errors.codeErr = true
        res.redirect('/dashboard/security')
    } catch (error) {
        console.log(error);
    }
}

const updateProfileData = async (req, res) => {
    try {
        if (req.session.error) {
            res.redirect('/dashboard/security')
            return
        }

        if (req.session.sessionData.email !== req.session.user.email) {
            req.session.sessionData.confirmCode = randomCodeGenerate()

            await sendMail(req.session.sessionData.email,
                "Email'ni tasdiqlash",
                `<h1>Email tasdiqlash uchun kod: ${req.session.sessionData.confirmCode}`
            )

            res.redirect('/dashboard/security')
            return
        }
    
        const newData = {
            full_name: req.session.newData.full_name,
            username: req.session.newData.username
        }

        const updatedUser = await User.findByIdAndUpdate(req.session.user._id, newData)
        delete req.session.newData
        delete req.session.user
        req.session.sessionData.success = "Profil muvaffaqiyatli o'zgartirildi"
        delete req.session.sessionData
        res.redirect('/dashboard/security')
    } catch (error) {
        console.log(error);
    }

}

const cancelUpdateProfile = (req, res) => {
    delete req.session.sessionData
    res.redirect('/dashboard/security')
}

const changePasswordPage = (req, res) => {
    res.render('dashboard/change-password', {
        title: "Parolni o'zgartirish",
        layout: 'dashboard-layout',
        isSecurityPage: true,
        error: req.session.error
    })

    delete req.session.error
}

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, newPassword2 } = req.body
    
        if (!currentPassword || !newPassword || !newPassword2) {
            req.session.error = "Iltimos barcha maydonlarni to'ldiring"
            res.redirect('/dashboard/security/changePassword')
            return
        }
    
        const currendPassCompare = await bcrypt.compare(currentPassword, req.session.user.password)
    
        if (!currendPassCompare) {
            req.session.error = "Kechirasiz, siz joriy parolni noto'g'ri kiritdingiz"
            res.redirect('/dashboard/security/changePassword')
            return
        }
    
        if (newPassword !== newPassword2) {
            req.session.error = "Parollar bir biriga mos emas"
            res.redirect('/dashboard/security/changePassword')
            return
        }
    
        if (newPassword.length < 6) {
            req.session.error = "Parol kamida 6 belgidan iborat bo'lishi kerak"
            res.redirect('/dashboard/security/changePassword')
            return
        }
    
        const passHashSalt = await bcrypt.genSalt(12)
        const hashedPass = await bcrypt.hash(newPassword, passHashSalt)
    
        await User.findByIdAndUpdate(req.session.user._id, { password: hashedPass })
        res.redirect('/auth/logout')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getSecurityPage,
    updateProfileData,
    changeEmail,
    cancelUpdateProfile,
    changePasswordPage,
    changePassword
}