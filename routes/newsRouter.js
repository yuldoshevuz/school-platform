const { Router } = require('express')
const router = Router()
const { getNewsPage } = require('../controllers/newsController')

router.get('/news', getNewsPage)

module.exports = router