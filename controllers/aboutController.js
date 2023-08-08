const Testimonial = require('../models/testimonialModel')

const getAboutPage = async (req, res) => {
    const testimonials = await Testimonial.find().lean()

    res.render('index/about', {
        isAbout: true,
        title: 'Biz haqimizda',
        headerTitle: "Biz haqimizda",
        headerSub: "Maktabimiz haqidagi qisqacha ma'lumotlar",
        testimonials
    })
}

module.exports = { getAboutPage }