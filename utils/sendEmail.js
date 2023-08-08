function randomCodeGenerate() {
	const maxm = 9999
	const minm = 1000
	return Math.floor(Math.random() * (maxm - minm + 1) + minm)
}

const sendMail = (to, subject, message) => {
	try {
		const nodemailer = require('nodemailer');

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD
			}
		});

		const mailOptions = {
			from: process.env.EMAIL,
			to,
			subject,
			text: message
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				throw error
			} else {
				console.log('Email sent: ' + info.response);
			}
		})

	} catch (error) {
		console.log(error);
	}
}

module.exports = { randomCodeGenerate, sendMail }