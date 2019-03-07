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
    database.userExists(req.body.email, (callback) => {
        if (callback == 0){
            database.createUserFromEmail(
                req.body.name,
                req.body.email,
                req.body.city,
                req.body.phone,
                req.body.password,
                "email"
            );
            confirmation(req.body.email);
            res.send("Cadastrado");
        }else{
            res.send(callback);
        }
    });
    
});

router.get('/confirmation/:email', async (req, res) => {
    database.confirmationSucess(req.params.email, (result) =>{
        if (result == "success"){
            res.send("Conta confimada");
        } else {
            res.send("Erro ao confirmar"+result);
        }

    });
    
});


router.post('/login/enter', (req, res) => {
    var nome = req.body.email;
    var senha = req.body.password;
    res.redirect('/');
})



module.exports = router;


