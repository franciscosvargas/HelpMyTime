const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/auth/auth')(passport);
/* --------------------------------------------------------- */

// Database 
const connectDatabase = require('./config/database/db_config');
const dbCategories = require('./config/database/db_categories');
const dbEst = require('./config/database/db_establishment');
const dbUser = require('./config/database/db_users');
const payment = require('./config/payment/payment')

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
app.set('views', path.join(__dirname, '../frontend/views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Start Database Connection
connectDatabase();
//dbCategories.createCategoryFromFile();


// Public
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Routes
app.use('/categorias', categoriesRouter);
app.use('/conta', accountRouter);
app.use('/dashboard', panelRouter);


app.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/dashboard');

	} else {
		dbCategories.getCategoryHomeList((categories) => {
			res.render('home', { categories: categories, redirect: "/dashboard"});
		});
	}
});

app.get('/e/:establishment', async (req, res) => {
	const est = await dbEst.getEstBySlug(req.params.establishment);
	if (est) {
		res.render('establishment', { layout: 'general', establishment: est, redirect: req.url, user: req.user});
	} else {
		res.redirect('/');
	}
	
});

app.get('/s', async (req, res) => {
	//req.query.service
	const service = await dbEst.searchService(req.query.term);
	res.render('buscar-servicos', {services: service, layout: 'panel'});
});

app.get('/getlistapesquisa', async (req, res) => {
	const service = await dbEst.searchService(req.query.term);
	res.json(service);
});


app.get('/getservicesbylocation', async (req, res) => {
	const est = await dbEst.getServicesByLocation(req.query);
	res.status(200).send(est);
});

app.get('/getserviceinformation', async (req, res) => {
	const service = await dbEst.getSchedulesFromService(req.query.service)
	res.status(200).json(service);
});


app.post('/notification', async (req, res) => {
	console.log(req.body);
	res.setHeader('Access-Control-Allow-Origin', 'https://sandbox.pagseguro.uol.com.br');
	try {
		res.status(200);
		if (req.body.notificationType == 'preApproval')
			dbUser.processNotification(await payment.preapprovalNotification(req.body));

		if (req.body.notificationType == 'transaction')
			dbUser.processNotification(await payment.transactionNotification(req.body));

	} catch (e) {
		console.log(e);
		res.status(400);
	}
});

app.get('*', function (req, res) {
	res.render('404', { layout: 'general' });
});



app.listen(3001, () => {
	console.log("Servidor iniciado na porta 3001");
});




