const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true } )

module.exports = model('Message', messageSchema)