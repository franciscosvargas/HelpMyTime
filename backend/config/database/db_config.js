const mongoose = require('mongoose');

// Models
const User = require('../../models/User');
const Category = require('../../models/Category');
const Establishment = require('../../models/Establishment');
const Service = require('../../models/Service');
const Schedule = require('../../models/Schedule');

var database_name = "htm";
mongoose.Promise = global.Promise;

function connect() {
	//mongodb+srv://admin:yottaadmin@cluster0-qqall.mongodb.net/htm?retryWrites=true
	mongoose.connect("mongodb+srv://admin:yottaadmin@cluster0-qqall.mongodb.net/htm?retryWrites=true", {useNewUrlParser: true})
		.then(() => { console.log("Conectado ao database: " + database_name) })
		.catch(err => {console.log("Erro ao se conectar ao database: " + database_name + " - " + erro) });
		
	mongoose.model('users', User);
	mongoose.model('categories', Category);
	mongoose.model('establishments', Establishment);
	mongoose.model('services', Service);
	mongoose.model('schedules', Schedule);
}

module.exports = connect;
