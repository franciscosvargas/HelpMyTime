const express = require('express');
const passport = require('passport');
const router = express.Router();
const database = require('../config/database');
const confirmation = require('../config/auth/confirmation');


router.get('/', (req, res) => {
    res.send('Conta');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login/facebook', (req, res, next) => {
    passport.authenticate('facebook', {
         scope : ['email'] 
    })(req, res, next)
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/conta/cadastro",
        failureFlash: true
    })(req, res, next)
});

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/cadastro', (req, res) => {
    database.getCategoryList((categories) => {
        res.send("Erro ao criar usuário");
    })
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
    database.confirmationSucess(req.params.email, () =>{

    }).then(result => {
        res.send(result);
    }).catch(result => {
        res.send(result);
    });
    
});


module.exports = router;


