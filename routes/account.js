const express = require('express');
const passport = require('passport');
const router = express.Router();
const dbUser = require('../config/database/db_users');
const sendEmail = require('../config/email/send');

router.get('/', (req, res) => {
	res.send(req.body.error);
});

// Login 
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: "/dashboard",
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
	res.redirect('/dashboard');
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
	res.redirect('/dashboard');
});

// Cadastro
router.post('/cadastro', (req, res) => {
	dbUser.userNotExists(req.body.email).then(() => {
		dbUser.createUserFromEmail({
			name: req.body.name,
			email: req.body.email,
			city: req.body.city,
			phone: req.body.phone,
			password: req.body.password,
			account_type: "email"
		}).then(() => {
			req.flash("alert_message", "Usuário criado com sucesso!");
			res.redirect(307, '/conta/confirm/');
		}).catch((error) => {
			console.log(error);
			req.flash("alert_message", error);
			res.redirect('/');
		});  
	}).catch(error => {
		console.log(error);
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

router.post('/confirmation', (req, res) => {
	dbUser.confirmationSucess(req.body.email, () => {
	}).then(result => {
		req.flash("alert_message", result);
		res.redirect('/');
	}).catch(result => {
		req.flash("alert_message", result);
		res.redirect('/');
	});
});

router.post('/redefinir-senha',(req, res) => {
	dbUser.forgotPassword(req.body.email).then((message) => {
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

router.post('/novasenha', (req, res) => {
	res.render('change_password', {email: req.body.email});
});

router.post('/novasenha/send', (req, res) => {
	dbUser.rewritePassword({
		email: req.body.email,
		password: req.body.password
	}).then((message) => {
		req.flash("alert_message", message);
		res.redirect('/');
	});
});

module.exports = router;
