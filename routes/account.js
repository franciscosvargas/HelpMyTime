const express = require('express');
const passport = require('passport');
const router = express.Router();
const database = require('../config/database');
const sendEmail = require('../config/email/send');

router.get('/', (req, res) => {
	res.send(req.body.error);
});


// Login 
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: "/painel",
		failureRedirect: "/",
		failureFlash: true
	})(req, res, next)
});

router.post('/login/facebook', (req, res, next) => {
	passport.authenticate('facebook', {
		 scope : ['email'] 
	})(req, res, next)
});

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
	// Successful authentication, redirect home.
	res.redirect('/');
});

router.post('/login/google', (req, res, next) => {
	passport.authenticate('google', {
		 scope : ['email', 'profile'] 
	})(req, res, next)
});

router.get('/login/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
	// Successful authentication, redirect home.
	res.redirect('/');
});

// Cadastro
router.post('/cadastro', (req, res) => {
	database.userNotExists(req.body.email).then(() => {
		database.createUserFromEmail(
			req.body.name,
			req.body.email,
			req.body.city,
			req.body.phone,
			req.body.password,
			"email"
		).then(() => {
			req.flash("alert_message", "Usuário criado com sucesso!");
			res.redirect(307, '/conta/confirm/');
		}).catch((error) => {
			req.flash("alert_message", error);
			res.redirect('/');
		});  
	}).catch(error => {
		req.flash("alert_message", error);
		res.redirect('/');
	});   
});

// Confirmation
router.post('/confirm', async (req, res) => {
	await sendEmail({
		type: "confirm",
		email: req.body.email,
		title: "Sua confirmação de email chegou",
		action: req.hostname+":3001/conta/confirmation"
	});
	req.flash("alert_message", "Um email de confirmação foi enviado para o seu email. Confira.");
	res.redirect('/');
});

router.post('/confirmation', async (req, res) => {
	database.confirmationSucess(req.body.email, () => {
	}).then(result => {
		req.flash("alert_message", result);
		res.redirect('/');
	}).catch(result => {
		req.flash("alert_message", result);
		res.redirect('/');
	});
});

router.post('/redefinir-senha', async (req, res) => {
	database.forgotPassword(req.body.email).then((message) => {
		sendEmail({
			type: "password",
			email: req.body.email,
			title: "Sua redefinição de senha chegou",
			action: req.hostname+":3001/conta/novasenha"
		});
		req.flash("alert_message", message);
		res.redirect('/');
	}).catch((err) => {
		req.flash("alert_message", err);
		res.redirect('/');
	});
});

router.post('/novasenha', async (req, res) => {
	res.send(req.body.email);
});

module.exports = router;
