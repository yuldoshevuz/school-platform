const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Number, required: true },
})

module.exports = model('Message', messageSchema)