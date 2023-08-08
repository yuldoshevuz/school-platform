const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    id: { type: Number, required: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    super_admin: { type: Boolean, required: true, default: false }
}, { timestamps: true })

module.exports = model('User', userSchema)