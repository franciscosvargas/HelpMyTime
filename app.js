const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');    
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/auth/auth')(passport);

const database = require('./config/database');

// Importing Routes
const panelRouter = require('./routes/panel');
const categoriesRouter = require('./routes/categories');
const accountRouter = require('./routes/account');
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
			res.locals.url = "http://localhost:3001";
			res.locals.msg = req.flash("alert_message");
			res.locals.error = req.flash("error");
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
	app.use('/painel', panelRouter);

	app.get('/', (req, res) => {
		if (req.isAuthenticated()) {
			res.redirect('/painel');
		} else {
			database.getCategoryHomeList((categories) => {
				res.render('home', {categories: categories});
			});
		}
	});

app.listen(3001, () => {
	console.log("Servidor iniciado na porta 3001");
});




