const { Schema, model } = require('mongoose')

const testimonialSchema = new Schema({
    name: { type: String, required: true },
    classes: { type: String, required: true },
    image: { type: String, required: true },
    comment: { type: String, required: true },
})

module.exports = model('Testimonials', testimonialSchema)