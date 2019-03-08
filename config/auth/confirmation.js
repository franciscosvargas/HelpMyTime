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

// url = site/conta/confirmation/id
var sendConfirmation = (email) => {
    mailOptions = {
        from: 'code101.mail@gmail.com',
        to: email,
        subject: 'Sua confirmação de email chegou!',
        html: `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            <title>HelpMyTime - Confirme seu Email</title>
            <style>
                body {
                    margin: 0;
                    font-family: Arial;
                    background-color: #eee;
                }
        
                a {text-decoration: none}
        
                .email-header {
                    text-align: center;
                    background-image: linear-gradient(
                        to left, 
                        rgba(2,0,100,1) 0%,
                        rgba(9,9,121,1) 50%,
                        rgba(0,212,255,1) 100%
                    );
                    padding: 8px;
                }
        
                .email-body {
                    text-align: center;
                    padding: 18px;
                }
        
                .highlight {
                    font-weight: bold;
                    color: #ccc000;
                }
        
                .body-1 {margin-bottom: 0}
        
                .confirm-btn {
                    padding: 12px 18px;
                    margin: 16px;
                    border: none;
                    border-radius: 25px;
                    text-transform: uppercase;
                    font-size: 16px;
                    font-weight: bold;
                    background: #09045b;
                    outline: none;
                }
        
                .confirm-btn a {color: white}
        
                .arrow-icon {
                    margin-bottom: 0;
                    font-size: 22px;
                    margin-top: 0;
                }
        
                .sidenote {
                    background-color: gainsboro;
                    padding: 12px;
                    border-left: 10px solid lightgrey;
                }

                
            </style>
        </head>
        <body>
            <div class="email-header">
                <img width="138" height="82"src="https://firebasestorage.googleapis.com/v0/b/caduser-a8b76.appspot.com/o/helpMyTime-logo.png?alt=media&token=3a7bdaac-683e-453e-8853-07b770a5caaf" alt="helpmytime-logo">
            </div>
            <div class="email-body">
                <h3>
                    Você está a um passo de aproveitar as facilidades do HelpMyTime!
                </h3>
                <hr>
                <p class="body-1">Mas primeiro precisamos que confirme o seu endereço de email clicando no botão que está aqui embaixo</p>
                <p class="arrow-icon">&darr;</p>
                <button class="confirm-btn">
                    <a href="http://localhost:3001/conta/confirmation/`+email+`">Confirmar email</a>
                </button>
                <div class="sidenote">
                    <b>Aviso:</b> Ahh, essa confirmação serve para garantimos a sua segurança e de todos os usuários do nosso sistema, além de prevenirmos a prática de spam proveniente de usuários mal-intencionados e para que possamos continuar oferecendo um serviço de qualidade.
                </div>
            </div>
        </body>
        </html>`
    };
    
    sendEmail();
}
 
module.exports = sendConfirmation;