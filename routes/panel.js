const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const db_Est = require("../config/database/db_establishment");

// Configuration to receive files 
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
	}
});
const upload = multer({storage});


// Middleware 
router.use((req, res, next) => {
	try {
		/*if (req.isAuthenticated && req.user.confirmated) {
			next();
		} else if (req.isAuthenticated && !req.user.confirmated) {
			res.redirect(307, '/conta/confirm/'+req.body.email);
		} */
		next();
	} catch (err) {
		req.flash('alert_message', 'Faça login ou cadastre-se primeiro.');
		res.redirect('/');
	}
});

// Routes
router.get('/', (req, res) => {
	console.log(req.user);
	res.redirect('/dashboard/visao-geral')
});


// Routes for establishment 
router.get('/visao-geral', (req, res) => {
	try {
		//restrict(req.user.plan);
		res.render('e_overview', {user: req.user, layout: 'panel'});
	} catch (err) {
		res.send("Você n tem um plano");
	}
});

router.post('/pagamento', (req, res) => {
	res.send(req.body);
});

router.get('/cadastrar-estabelecimento', (req, res) => {
	res.render('cadastrar-estabelecimento', {user: req.user, layout: 'panel'});
});

router.post('/cadastrar-estabelecimento', upload.single('logo'), async (req, res) => {
	try {
		let data = req.body;
		data.owner = req.user._id;
		// Resize and compress logo
		await sharp(req.file.path)
			.rotate()
			.resize(500)
			.toBuffer()
			.then(buffer => {data.logo = buffer});

		// Save establishment on database
		await db_Est.createEst(data);
		fs.unlink(req.file.path);
		res.send("Estabelecimento criado com sucesso");
	} catch (e) {
		res.send(e);
	}	
});


async function restrict(plan) {
	try {
		if (plan) resolve(true);
	}  catch (e) {
		reject(false);
	}
}

module.exports = router;
