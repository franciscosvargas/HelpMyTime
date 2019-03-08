const express = require('express');
const router = express.Router();
const database = require('../config/database');
const confirmation = require('../config/auth/confirmation');


router.get('/', (req, res) => {
    res.send('Conta');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/cadastro', (req, res) => {
    database.getCategoryList((categories) => {
        res.render('register', {categories: categories})
    })
});

router.post('/cadastro', (req, res) => {
    database.userExists(req.body.email).then(() => {
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


router.post('/login/enter', (req, res) => {
    var nome = req.body.email;
    var senha = req.body.password;
    res.redirect('/');
})



module.exports = router;


