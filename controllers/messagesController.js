const parseDate = require('../views/helpers/parseDate')
const Message = require('../models/messageModel')

const getMessagesPage = async (req, res) => {
    const messages = await Message.find().lean()

    res.render('dashboard/messages', {
        title: 'Yangi kelgan xabarlar',
        layout: 'dashboard-layout',
        user: req.session.user,
        isMessagesPage: true,
        messages: [ ...messages].reverse(),
        lengthMsg: messages.length,
        message: req.session.message ? req.session.message : messages[messages.length -1],
        helpers: {
            parseDate,
            shortMessage(text) {
                return `${text.slice(0, 30)}...`
            }
        }
    })

    delete req.session.message
}

const getMessagePageById = async (req, res) => {
    try {
        const id = req.params.id
        req.session.message = await Message.findById(id).lean()
    
        res.redirect('/dashboard/messages')
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getMessagesPage, getMessagePageById }