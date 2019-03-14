const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
	res.send('olá');
});


module.exports = router;
