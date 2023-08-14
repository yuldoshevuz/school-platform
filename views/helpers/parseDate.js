const moment = require('moment')

module.exports = (date) => moment(date).format('DD.MM.YYYY HH:mm')
