const express = require('express');
const passport = require('passport');
const router = express.Router();
const database = require('../config/database');
const confirmation = require('../config/auth/confirmation');

router.get('/', (req, res) => {
	res.send('Conta');
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: "/",
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
			confirmation(req.body.email);
			res.redirect('/');
		}).catch((error) => {
			res.send(error);
		});  
	}).catch(error => {
		res.send(error);
	});   
});

router.get('/confirmation/:email', async (req, res) => {
	database.confirmationSucess(req.params.email, () => {
	}).then(result => {
		res.send(result);
	}).catch(result => {
		res.send(result);
	});
});

module.exports = router;
