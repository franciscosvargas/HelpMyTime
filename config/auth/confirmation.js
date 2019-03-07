const nodemailer = require('nodemailer');
var mailOptions = {};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'code101.mail@gmail.com',
        pass: 'codeadmin'
    }
});

function sendEmail(){
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}

// url = site/conta/confirmacao/id
var sendConfirmation = (email) => {
    mailOptions = {
        from: 'code101.mail@gmail.com',
        to: email,
        subject: 'Sua confirmação de email chegou!',
        html: "Para confirmar <a href='http://localhost:3001/conta/confirmation/" + email + "'><span>link</span></a>"
    };
    
    sendEmail();
}
 
module.exports = sendConfirmation;