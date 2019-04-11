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

// Cadastro
router.post('/cadastro', async (req, res) => {
	try {
		await dbUser.createUserFromEmail(req.body);
		req.flash("alert_message", "Usuário criado com sucesso!");
		res.redirect(307, '/conta/confirm/');
	} catch (err) {
		req.flash("alert_message", err);
		res.redirect('/');
	}
});

// Confirmation
router.post('/confirm', async (req, res) => {
	await sendEmail({
		type: "confirm",
		email: req.body.email,
		title: "Sua confirmação de email chegou",
		action: req.hostname+"/conta/confirmation"
	});
	req.flash("alert_message", "Um email de confirmação foi enviado para o seu email. Confira.");
	res.redirect('/');
});

router.post('/confirmation', async (req, res) => {
	await dbUser.confirmationSucess(req.body.email)
		.then(result => { req.flash("alert_message", result) })
		.catch(result => { req.flash("alert_message", result) });
	res.redirect("/");
});

router.post('/redefinir-senha', async (req, res) => {
	try {
		await dbUser.forgotPassword(req.body.email)
			.then(message => {req.flash("alert_message", message)});
		sendEmail({
			type: "password",
			email: req.body.email,
			title: "Sua redefinição de senha chegou",
			action: req.hostname+"/conta/novasenha"
		});
		res.redirect('/');
	} catch (err) {
		req.flash("alert_message", err);
		res.redirect('/');
	}
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
