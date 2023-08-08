const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const mongoURL = process.env.MONGO_URL
        const connecting = await mongoose.connect(mongoURL)

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB