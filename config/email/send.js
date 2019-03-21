const nodemailer = require('nodemailer');
const assembleData = require('./models/assemble');
const templateConfirmation = require('./models/confirmation');
const templatePassword = require('./models/password');

var href = "http://localhost:3001/conta/confirmation/"
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'code101.mail@gmail.com',
		pass: 'codeadmin'
	}
});

/* var data = {
	type: "confirmation",
	email: email
	title: title,
	text1: text1,
	urlGif: urlgif,
	title2: title2,
	text2: text2,
	actionText: actionText,
	action: action,
	button: button	
}*/

// url = site/conta/confirmation/id
var createEmail = async (data) => {
	console.log("DATA:" + data);
	var mailOptions = {
		from: 'code101.mail@gmail.com',
		to: data.email,
		subject: data.title,
		html: await loadTemplate(data)
	};

	
	sendEmail(mailOptions);
}

const loadTemplate = (data) => {
	if (data.type == "confirm") {
		return(templateConfirmation(data.action, data.email));
	} else if (data.type == "password") {
		return(templatePassword(data.action, data.email));
	} else {
		return(assembleData(data));
	}
}

function sendEmail(mailOptions){
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email enviado: ' + info.response);
		}
	});
}
 
module.exports = createEmail;