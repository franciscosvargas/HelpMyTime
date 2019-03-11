const localStrategy = require('passport-local').Strategy;
const fbStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const database = require('../database');

const User = require('../../models/User');

mongoose.model('users', User);
const RefUser = mongoose.model('users');

module.exports = (passport) => {
	passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) =>{
		RefUser.findOne({email: email, account_type: "email"}).then((user) => {
			if(!user){
				console.log("usuario não encontrado");
				return done(null, false, {message: "Usuário não encontrado"});
			}
			
			bcrypt.compare(password, user.password, (error, okay) => {
				if (okay) {
					console.log("Usuário: "+user.name+" autenticado");
					return done(null, user);

				} else {
					return done(null, false, {message: "Senha incorreta"});
				}
			});
		});
	}))

	passport.use(new fbStrategy({
		clientID: "854255114916897",
		clientSecret: "ba28e64b76cdde0d6648f7b9ce05260f",
		callbackURL: "http://localhost:3001/conta/login/facebook/callback",
		profileFields: ['id', 'displayName', 'emails']
		},
		function(accessToken, refreshToken, profile, cb) {
            // Verify if user exists
            database.userNotExists(profile.emails[0].value).then(() => {
                // Case user not exists, create the user
                database.createUserFromFacebook(
                    profile.displayName,
                    profile.emails[0].value,
                    "Palmas",
                    0,
                    "none_fb",
                    "facebook").then((sucess) => {
                        // If the user has been registered, sign-in 
                        RefUser.findOne({ email: profile.emails[0].value, account_type: "facebook" }).then((user) => {
                            return cb(null, user);
                        });
                    }).catch((err) => {
                        return cb(err, null);
                });
            }).catch((res) => {
                // Case user exists, sign-in the user
                RefUser.findOne({ email: profile.emails[0].value, account_type: "facebook" }).then((user) => {
                    // Verify if has errors
                    if (res == "Usuário já cadastrado") {
                        return cb(null, user);
                    }
                    return cb(res, user);
                });
            });
		}
	));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		RefUser.findById(id, (error, user) => {
			done(error, user);
		});
	});
}

