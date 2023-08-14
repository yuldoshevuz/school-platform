const { Schema, model } = require('mongoose')

const tokenSchema = new Schema({
    token: { type: String, required: true },
    expired_date: { type: Number, required: true },
    created_admin: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
}, { timestamps: true } )

module.exports = model('Tokens', tokenSchema)