const isAuth = (req, res, next) => {
    if (!req.session.auth || !req.session.user) {
        res.redirect('/auth/login')
        return
    }
    next()
}

const isntAuth = (req, res, next) => {
    if (req.session.auth && req.session.user) {
        res.redirect('/dashboard')
        return
    }
    next()
}


module.exports = { isAuth, isntAuth }