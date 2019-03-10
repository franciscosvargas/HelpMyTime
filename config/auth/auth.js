const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const database = require('../database');

const User = require('../../models/User');

mongoose.model('users', User);
const RefUser = mongoose.model('users');



module.exports = (passport) => {

    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) =>{
        RefUser.findOne({email: email}).then((user) => {
            if(!user){
                console.log("usuario não encontrado");
                return done(null, false, {message: "Usuário não encontrado"});
            }

            bcrypt.compare(password, user.password, (error, okay) => {
                if(okay){
                    console.log("Usuário: "+user.name+" autenticado");
                    return done(null, user);

                }else{
                    return done(null, false, {message: "Senha incorreta"});
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        RefUser.findById(id, (error, user) => {
            done(error, user);
        })

    })
}