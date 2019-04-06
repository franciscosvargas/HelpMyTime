const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
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
		if (req.isAuthenticated && req.user.confirmated) {
			next();
		} else if (req.isAuthenticated && !req.user.confirmated) {
			res.redirect(307, '/conta/confirm/'+req.body.email);
		} 
	} catch (err) {
		req.flash('alert_message', 'Faça login ou cadastre-se primeiro.');
		res.redirect('/');
	}
	
});

// Routes
router.get('/', (req, res) => {
	console.log(req.user);
	res.render('e_cad_establishment', {user: req.user, layout: 'panel'});
});

router.post('/cad-est', upload.single('logo'), (req, res) => {
	try {
		let data = req.body;
		let imgpath = fs.readFileSync(req.file.path);
		let encode_image = imgpath.toString('base64');

		data.logo = {
			contentType: req.file.mimetype,
			image:  new Buffer(encode_image, 'base64')
		}

		data.owner = req.user._id;

		db_Est.createEst(data);
		res.send("Estabelecimento criado com sucesso");
	} catch (e) {
		res.send(e);
	}
	
});

module.exports = router;
