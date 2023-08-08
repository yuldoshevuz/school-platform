const { Router } = require('express')
const router = Router()

router.use((req, res) => {
    res.render('index/404', {
        title: 'Topilmadi',
        headerTitle: "Topilmadi",
        headerSub: "Siz so'ragan sahifa topilmadi"
    })
})

module.exports = router