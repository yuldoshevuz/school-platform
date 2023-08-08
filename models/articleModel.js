const { Schema, model } = require('mongoose')

const newsSchema = new Schema({
    title: { type: String, required: true },
    image_url: { type: String, required: true },
    description: { type: String, required: true, min: 50 },
    date: { type: Number, required: true },
    user_id: { type: String, required: true }
})

module.exports = model('News', newsSchema)