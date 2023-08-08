const parseDate = require('../views/helpers/parseDate')
const userName = require('../views/helpers/userName')

const News = require('../models/articleModel')

const getNewsPage = async (req, res) => {
    const news = await News.find().lean()
    res.render('index/news', {
        isNews: true,
        title: 'Yangiliklar',
        headerTitle: "Yangiliklar / Maqolalar",
        headerSub: "Maktabimiz haqidagi so'nggi yangiliklar",
        news: [...news].reverse(),
        helpers: {
            parseDate,
            userName
        }
    })
}

module.exports = { getNewsPage }