const uid = require('uid-safe')

const User = require('../models/userModel')
const Token = require('../models/adminTokenModel')

const parseDate = require('../views/helpers/parseDate')

const getAdminsPage = async (req, res) => {
    try {
        const thisUser = await User.findById(req.session.user._id).lean()
        const users = await User.find().lean()
    
        const confirmUrl = 'http://localhost:5000/auth/confirm/'
    
        res.render('dashboard/admins', {
            title: 'Adminlar',
            layout: 'dashboard-layout',
            user: req.session.user,
            isAdminsPage: true,
            users,
            thisUser,
            newToken: req.session.newToken,
            confirmUrl,
            helpers: {
                parseDate
            }
        })
    
        delete req.session.newToken
    } catch (error) {
        console.log(error);
    }
}

const getAddAdmin = async (req, res) => {
    try {

        const token = uid.sync(18)

        const newToken = {
            token,
            created_admin: req.session.user._id,
            active: true
        }

        await Token.create(newToken)
        req.session.newToken = newToken
        res.redirect('/dashboard/admins')
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAdminsPage,
    getAddAdmin
}