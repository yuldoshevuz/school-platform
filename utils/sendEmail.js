const nodemailer = require('nodemailer');

function randomCodeGenerate() {
	const maxm = 9999
	const minm = 1000
	return Math.floor(Math.random() * (maxm - minm + 1) + minm)
}

const authData = {
	user: process.env.EMAIL,
	pass: process.env.EMAIL_PASS
}

const sendMail = async (to, subject, message) => {
	try {

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: authData
		});

		const mailOptions = {
			from: authData.user,
			to,
			subject,
			html: message
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error)
			} else {
				console.log('Email sent: ' + info.response);
			}
		})

	} catch (error) {
		console.log(error);
	}
}

module.exports = { randomCodeGenerate, sendMail }