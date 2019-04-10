const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const database = require('../database/db_users');

const User = require('../../models/User');

mongoose.model('users', User);
const RefUser = mongoose.model('users');

module.exports = (passport) => {
	/* AUTHENTICATION USING EMAIL AND PASSWORD */
	passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
		RefUser.findOne({ email: email}).then((user) => {
			if (!user) {
				return done(null, false, { message: "Usuário não encontrado. Cadastre-se." });
			}
			bcrypt.compare(password, user.password, (error, okay) => {
				if (okay) {
					return done(null, user);
				} else {
					return done(null, false, { message: "Email e/ou senha incorretos." });
				}
			});
		});
	}))

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		RefUser.findById(id, (error, user) => {
			done(error, user);
		});
	});
}

