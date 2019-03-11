const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');    
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const fs = require('fs');
var https = require('https');
require('./config/auth/auth')(passport);

const database = require('./config/database');
const categoriesRouter = require('./routes/categories');
const accountRouter = require('./routes/account');
var certOptions = {
    key: fs.readFileSync(path.resolve('config/ssl/server.key')),
    cert: fs.readFileSync(path.resolve('config/ssl/server.crt'))
  }
// Config
    // Session  
        app.use(session({
            secret: "htmadminsession",
            resave: true,
            saveUninitialized: true
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        app.use(flash());

    // Middleware
    
        app.use((req, res, next) => {
            res.locals.msg = req.flash("alert_message");
            res.locals.user = req.user || null;
            next();
        });
        
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

    app.all('*', function(req, res, next){
        if (req.secure) {
            return next();
        }
        res.redirect('https://'+req.hostname + ':' + 3002 + req.url);
    });

    app.get('/', (req, res) => {

        if(req.isAuthenticated()){
            res.send("Olá ," + req.user.name);
        } else {
            database.getCategoryHomeList((categories) => {
                res.render('home', {categories: categories});
            })
        }
        
    });

app.listen(3001, () =>{
    console.log("Servidor iniciado na porta 3001");
});

https.createServer(certOptions, app).listen(3002)



