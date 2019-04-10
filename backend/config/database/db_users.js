const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Model
const User = require('../../models/User');
const UserRef = mongoose.model('users', User);

async function createUserFromEmail(data) { 
	const newUser = new UserRef(data);
	try {
		await userNotExists(newUser.email);
		newUser.password = await encrypt(newUser.password);
 		newUser.save();
		return Promise.resolve(true);
	} catch (err) {
		return Promise.reject(err);
	}
}

async function userNotExists(email) {
	return new Promise((resolve, reject) => {
		UserRef.findOne({email: email}, function(err, user) {            
			if (!user && err == null) {
				resolve(true);
			} else if (user) {
				reject("Há um usuário cadastrado com esse endereço de email.");
			}
		});
	});
}

async function confirmationSucess(email) {
	try {
		await UserRef.findOne({email: email})
			.then(user => {
				user.confirmated = true;
				user.save();
			});    
		return Promise.resolve("Conta confirmada com sucesso! Faça login para continuar.");
	} catch (err) {
		return Promise.reject("Algum problema aconteceu, tente novamente.");
	}	
}

async function forgotPassword(email) {
	try {
		await userNotExists(email);
		return Promise.reject("Não encontramos nenhuma conta com o email informado.");
	} catch (err) {
		if(err.length == 52) {
			return Promise.resolve("Um link com a redefinição de senha foi enviada para o seu email.");
		}
	}
}

async function rewritePassword(data) {
	try {
		await encrypt(data.password)
			.then(password => {data.password = password});
		await UserRef.findOneAndUpdate({email: data.email}, {$set: {password: data.password}});
		return "A sua senha foi alterada. Faça login novamente.";
	} catch (err) {
		return "Aconteceu algum problema, tente novamente.";
	}
}


async function encrypt(data){
	return new Promise(resolve => {
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(data, salt, (err, hash) => {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
	});
}

async function getUserInfo(id){
	console.log(id);
	const data = await UserRef.findById(id).populate({path: 'establishment'});
	console.log(data);
	return 0;
}

module.exports = {
    encrypt: encrypt,
    forgotPassword: forgotPassword,
    confirmationSucess: confirmationSucess,
    userNotExists: userNotExists,
    createUserFromEmail: createUserFromEmail,
	rewritePassword: rewritePassword,
	getUserInfo: getUserInfo
}
