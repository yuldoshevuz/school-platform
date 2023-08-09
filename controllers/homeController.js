const News = require('../models/articleModel')
const Testimonial = require('../models/testimonialModel')
const Message = require('../models/messageModel')

const parseDate = require('../views/helpers/parseDate')
const userName = require('../views/helpers/userName')

const getHomePage = async (req, res) => {

    const news = await News.find().lean()
    const testimonials = await Testimonial.find().lean()

    const reversedNews = [ ...news ].reverse()
    const lastNews = reversedNews.slice(0, 3)

    res.render('index/home', {
        isHome: true,
        title: 'Bosh sahifa',
        news: lastNews,
        testimonials,
        helpers: {
            userName,
            parseDate,
            shortArticle(description) {
                if (description.length > 137) {
                    return `${description.slice(0, 137)}...`
                }
                return description
            }
        }
    })

    delete req.session.error
    delete req.session.success
    delete req.session.sessionData
}

const sendNewMessageToAdmin = async (req, res) => {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
        res.status(400).json({
            ok: false,
            message: "Iltimos barcha maydonlarni to'ldiring"
        })
        return
    }

    await Message.create({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        date: Date.now() / 1000
    })
    res.status(200).json({
        ok: true,
        message: "Xabaringiz adminstratorga muvaffaqiyatli yetkazildi"
    })
}

module.exports = { getHomePage, sendNewMessageToAdmin }