const getContactPage = (req, res) => {
    res.render('index/contact', {
        isContact: true,
        title: 'Bog\'lanish',
        headerTitle: "Bog'lanish",
        headerSub: "Biz haqimizdagi fikringizni qoldiring"
    })
}

module.exports = { getContactPage }