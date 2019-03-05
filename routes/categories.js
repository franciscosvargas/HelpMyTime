const express = require('express');
const router = express.Router();
const configDB = require('../dbconfig');    

router.get('/:slug', (req, res) => {
    res.send('Categoria:' + req.params.slug);
});

router.get('/add/:name/:slug', (req, res) => {
    configDB.createCategory(req.params.name, req.params.slug);
    res.send('Categoria adicionada');
});

module.exports = router;