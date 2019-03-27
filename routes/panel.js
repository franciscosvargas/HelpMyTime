const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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
	if (req.isAuthenticated && req.user.confirmated) {
		next();
	} else if (req.isAuthenticated && !req.user.confirmated) {
		res.redirect(307, '/conta/confirm/'+req.body.email);
	} else {
		req.flash('alert_message', 'Faça login ou cadastre-se primeiro.');
		res.redirect('/');
	}
});

// Routes

router.get('/', (req, res) => {
	res.render('e_cad_establishment', {user: req.user, layout: 'panel'});
});


router.post('/cad-est', upload.single('file'), (req, res) => {
	res.send(req.file.path);
});

module.exports = router;