const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const configDB = require('./dbconfig')

// Config
    // Template Engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');

    // Start Database Connection
        configDB.connect();
        
    // Public
        app.use(express.static(path.join(__dirname, "public")));

// Routes
    app.get('/', (req, res) => {
        res.render('home');
    });



app.listen(3001, () =>{
    console.log("Servidor iniciado na porta 3001");
});




