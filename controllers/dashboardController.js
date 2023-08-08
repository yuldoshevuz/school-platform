const getDashboardPage = (req, res) => {
    res.render('dashboard/dashboard', {
        title: "Admin dashboard",
        layout: 'dashboard-layout',
        user: req.session.user,
        isDashboardPage: true
    })
}

module.exports = { getDashboardPage }