const mongoose = require('mongoose');
const Category = require('../../models/Category');
const CategoryRef = mongoose.model('categories', Category);

function createCategory(name, slug) {
	new CategoryRef({
		name: name,
		slug: slug,
		rank: 1
	}).save().then(() => {
		console.log("Categoria cadastrada com sucesso");
	}).catch((erro) => {
		console.log("Erro ao criar categoria: "+erro);
	});
}

function createCategoryFromFile(){
	var lineReader = require('line-reader');
	lineReader.eachLine('./public/database_start/categorys.txt', function(line, last) {
		var name = line;
		var slug = line;
		// Formating name to slug
			slug = slug.toLowerCase();
			slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
			slug = slug.replace(/\s/g, '-');
			slug = slug.replace("/a","");
			slug = slug.replace("/","-");
		// The end of file    
		if (line == "FIM") {
			return false; 
		} else {
			createCategory(name, slug);
		}
	});
}

/* já tentei, será que n é na settings do live share */
/* vou ver aq*/

async function getCategoryList(){
	const categories = CategoryRef.find();
	return Promise.resolve(categories)
}

const getCategoryHomeList = (callback) => {
	CategoryRef.find().sort({rank: 'desc'}).limit(7).then((categories) => {
		callback(categories);
	});
}

module.exports = {
    getCategoryHomeList: getCategoryHomeList,
    getCategoryList: getCategoryList,
    createCategoryFromFile: createCategoryFromFile,
    createCategory: createCategory
}