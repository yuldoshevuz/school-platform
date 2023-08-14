const parseDate = require('../views/helpers/parseDate')
const userName = require('../views/helpers/userName')

const News = require('../models/articleModel')

const getBlogPage = async (req, res) => {
    delete req.session.data
    const news = await News.find().lean()
    res.render('dashboard/blog', {
        title: 'Maqolalar',
        layout: 'dashboard-layout',
        user: req.session.user,
        isBlogPage: true,
        news: [...news].reverse(),
        helpers: {
            userName,
            parseDate,
            shortArticleTitle(title) {
                if (title.length > 40) {
                    return `${title.slice(0, 40)}...`
                }
                return title
            },
            shortArticle(description) {
                if (description.length > 120) {
                    return `${description.slice(0, 120)}...`
                }
                return description
            }
        }
    })
}

const getBlogPageById = async (req, res) => {
    const id = req.params.id
    const article = await News.findById(id).populate('author').lean()

    if (!article) {
        res.redirect('/dashboard/blog')
        return
    }

    res.render('dashboard/one-blog', {
        title: article.title,
        layout: 'dashboard-layout',
        user: req.session.user,
        isBlogPage: true,
        article,
        helpers: {
            userName,
            parseDate
        }
    })
}

const getAddBlogPage = (req, res) => {
    res.render('dashboard/add-blog', {
        title: 'Yangilik kiritish',
        layout: 'dashboard-layout',
        user: req.session.user,
        isBlogPage: true,
        error: req.session.error,
        sessionData: req.session.data || ''
    })

    delete req.session.error
    delete req.session.data
}
const getAddBlog = async (req, res) => {
    try {

        if (req.session.error) {
            req.session.data = {
                title: req.body.title,
                description: req.body.description
            }
            res.redirect('/dashboard/blog/add')
            return
        }

        const { title, description } = req.body

        const newArticle = {
            title,
            image_url: '/uploads/' + req.file.filename,
            description,
            date: Date.now() / 1000,
            author: req.session.user._id
        }

        await News.create(newArticle)
        res.redirect('/dashboard/blog')
    } catch (error) {
        console.log(error);
    }
}

const getEditBlogPage = async (req, res) => {
    const blog = await News.findById(req.params.id).lean()

    res.render('dashboard/edit-blog', {
        title: 'Maqolani o\'zgartirish',
        layout: 'dashboard-layout',
        user: req.session.user,
        isBlogPage: true,
        blog,
        error: req.session.error,
        sessionData: req.session.data
    })

    delete req.session.error
}

const getEditBlog = async (req, res) => {
    try {
        if (req.session.error) {
            req.session.data = {
                title: req.body.title,
                description: req.body.description
            }

            res.redirect(`/dashboard/blog/edit/${req.params.id}`)
            return
        }

        const currentArticle = await News.findById(req.params.id)
        const newArticle = {
            title: req.body.title,
            image_url: '',
            description: req.body.description,
            date: currentArticle.date,
            author: currentArticle.author
        }

        if (req.body.currentImage) {
            newArticle.image_url = currentArticle.image_url
        }

        if (req.file) {
            newArticle.image_url = '/uploads/' + req.file.filename
        }
        
        await News.findByIdAndUpdate(req.params.id, newArticle)
        res.redirect('/dashboard/blog')

    } catch (error) {
        console.log(error);
    }
}

const getDeleteBlog = async (req, res) => {
    try {
        const id = req.params.id
        await News.findByIdAndRemove(id)
        res.redirect('/dashboard/blog')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getBlogPage,
    getBlogPageById,
    getAddBlogPage,
    getAddBlog,
    getEditBlogPage,
    getEditBlog,
    getDeleteBlog
}