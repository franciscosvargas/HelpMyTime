const mongoose = require('mongoose');

// Models
const User = require('../../models/User');
const Category = require('../../models/Category');

var database_name = "htm";
mongoose.Promise = global.Promise;

const connect = () => {
	mongoose.connect("mongodb://localhost/" + database_name, {useNewUrlParser: true}).then(() => {
		console.log("Conectado ao database: " + database_name);
	}).catch((erro) => {
		console.log("Erro ao se conectar ao database: " + database_name + " - " + erro);
	});

	mongoose.model('users', User);
	mongoose.model('categories', Category);
}

module.exports = connect;