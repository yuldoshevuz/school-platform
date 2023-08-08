const { Router } = require('express')
const router = Router()

const {
    getBlogPage,
    getBlogPageById,
    getAddBlogPage,
    getAddBlog,
    getEditBlogPage,
    getEditBlog,
    getDeleteBlog
} = require('../controllers/blogController')

const upload = require('../utils/fileUpload')
const { isAuth } = require('../middlewares/authCheck')
const blogValidate = require('../middlewares/blogValidate')

router.get('/', isAuth, getBlogPage)

router.get('/view/:id', isAuth, getBlogPageById)

router.get('/add', isAuth, getAddBlogPage)

router.post('/add', isAuth, upload.single('image'), blogValidate, getAddBlog)

router.get('/edit/:id', isAuth, getEditBlogPage)

router.post('/edit/:id', isAuth, upload.single('image'), blogValidate, getEditBlog)

router.post('/delete/:id', isAuth, getDeleteBlog)

module.exports = router