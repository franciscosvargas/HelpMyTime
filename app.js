const express = require('express');
const app = express();
const categoriesRouter = require('./routes/categories');
const handlebars = require('express-handlebars');
const path = require('path');
const configDB = require('./dbconfig');

// Config
    // Template Engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');

    // Start Database Connection
        configDB.connect();
        
    // Public
        app.use(express.static(path.join(__dirname, "public")));

// Routes
    app.use('/categorias', categoriesRouter);

    app.get('/', (req, res) => {
        var Ref =  configDB.getCategoryReference();
        Ref.find().sort({rank: 'desc'}).limit(8).then((categories) => {
            res.render('home', {categories: categories});
        })
    });

app.listen(3001, () =>{
    console.log("Servidor iniciado na porta 3001");
});




