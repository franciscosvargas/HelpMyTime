const express = require('express');
const router = express.Router();
const dbCategories = require('../config/database/db_categories');    

router.get('/view/:slug', (req, res) => {
	res.send('Categoria: ' + req.params.slug);
});

router.get('/add/:name/:slug', (req, res) => {
	dbCategories.createCategory(req.params.name, req.params.slug);
	res.send('Categoria adicionada');
});

router.get('/lista-categorias', async (req, res) => {
	const data = await dbCategories.getCategoryList();
	return res.json(data);
});

module.exports = router;