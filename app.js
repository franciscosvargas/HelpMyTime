const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');    
const path = require('path');

const database = require('./config/database');
const categoriesRouter = require('./routes/categories');
const accountRouter = require('./routes/account');
// Config
    // Template Engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');

    // BodyParser
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

    // Start Database Connection
        database.connect();
        
    // Public
        app.use(express.static(path.join(__dirname, "public")));

// Routes
    app.use('/categorias', categoriesRouter);
    app.use('/conta', accountRouter);

    app.get('/', (req, res) => {
        database.getCategoryHomeList((categories) => {
            res.render('home', {categories: categories});
        })
    });

app.listen(3001, () =>{
    console.log("Servidor iniciado na porta 3001");
});




