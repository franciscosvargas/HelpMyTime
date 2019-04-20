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
const upload = multer({ storage });

// Middleware 
router.use((req, res, next) => {
	try {
		if (req.isAuthenticated && req.user.confirmated) {
			next();
		} else if (req.isAuthenticated && !req.user.confirmated) {
			res.redirect(307, '/conta/confirm/' + req.body.email);
		}
	} catch (err) {
		req.flash('error', 'Faça login ou cadastre-se primeiro.');
		res.redirect('/');
	}
});

// Routes
router.get('/', (req, res) => {
	res.redirect('/dashboard/buscar-servicos');
});

router.get('/buscar-servicos', (req, res) => {
	res.render('buscar-servicos', {
		layout: 'panel'
	});
})

// Routes for establishment
router.get('/visao-geral', async (req, res) => {
	try {
		await restrict(req.user.establishment);
		const statistics = await db_Est.getStatistics(req.user.establishment);
		res.render('e_overview', {
			user: req.user,
			 statistics: statistics,
			layout: 'panel'
		});
	} catch (err) {
		console.log("erro");
		req.flash('error', 'Página somente para assinantes');
		res.redirect('/conta/logout');

	}
});

router.get('/config', async (req, res) => {
	res.render('config', {
		layout: 'panel'
	});
});

router.get('/meus-servicos', async (req, res) => {
	try {
		await restrict(req.user.establishment);
		
		const statistics = await db_Est.getStatistics(req.user.establishment);
		res.render('cadastrar-servico', {
			user: req.user,
			statistics: statistics,
			layout: 'panel'
		});
	} catch (e) {
		console.log(e);
		req.flash('error', 'Página somente para assinantes');
		res.redirect('/dashboard');
	}
});

router.get('/meus-horarios', async (req, res) => {
	try {
		const schedules = await db_Est.getSchedules(req.user.establishment);
		res.render('horarios', {
			user: req.user,
			schedules: schedules,
			layout: 'panel'
		});
	} catch (e) {
		console.log(e);
		req.flash('error', 'Página somente para assinantes');
		res.redirect('/conta/logout');
	}

});

router.get('/cadastrar-estabelecimento', (req, res) => {
	res.render('cadastrar-estabelecimento', { user: req.user, layout: 'panel' });
});

router.get('/getservico/:id', async (req, res) => {
	const service = await db_Est.getService(req.params.id);
	res.send(service);
});

router.get('/getservicohorario/:id', async (req, res) => {
	const service = await db_Est.getServiceBySchedule(req.params.id);
	res.send(service);
});

router.get('/getlistaservicos', async (req, res) => {
	const est = await db_Est.getEst(req.user.establishment);
	res.json(est.services);
});

// Routes Post
router.post('/atualizar-servico', async (req, res) => {
	try {
		await db_Est.updateService(req.body);
		res.redirect('/dashboard/meus-servicos');
	} catch (e) {
		req.flash('error', 'Todo mundo falha, dessa vez fomos nós. \nNos dê uma segunda chance, tente novamente. ');
		res.redirect('/dashboard/meus-servicos');
	}

});

router.post('/cadastrar-servico', (req, res) => {
	try {
		db_Est.createService(req.body, req.user.establishment);
		res.redirect('/dashboard/meus-servicos');
	} catch (e) {
		res.send(err);
	}

});

router.post('/cadastrar-horario', (req, res) => {
	try {
		req.body.id = req.user.establishment._id;
		db_Est.createSchedule(req.body);
		res.redirect('/dashboard/meus-horarios'); 
	} catch (e) {
		res.send(e);
	}

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
			.then(buffer => { data.logo = buffer.toString('base64') });

		// Save establishment on database
		await db_Est.createEst(data);
		fs.unlink(req.file.path);
		//res.redirect("http://pag.ae/7UMFDwyr1");
		res.redirect("/dashboard/meus-servicos");
	} catch (e) {
		res.send(e);
	}
});

async function restrict(establishment) {
	try {
		if (establishment) {
			return Promise.resolve(true);
		} else {
			return Promise.reject(false);
		}
	} catch (e) {
		return Promise.reject();
	}
}

module.exports = router;
