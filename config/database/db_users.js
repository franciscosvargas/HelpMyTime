const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Model
const User = require('../../models/User');
const UserRef = mongoose.model('users', User);

const createUserFromEmail = (data) => { 
	return new Promise((resolve, reject) => {
		const newUser = new UserRef(data);

		encrypt(newUser.password).then((hash) => {
			newUser.password = hash;
			newUser.save().then(() => {
				resolve("Usuário cadastrado com sucesso");
			}).catch((erro) => {
				console.log(erro);
				reject(erro);
			});
		}).catch((erro) => {
			console.log(erro);
			reject(erro);
		});		
	});
}

const createUserFromSocial = (name, email, city, phone, password, ac_type) => {
	return new Promise((resolve, reject) => {
		const newUser = new UserRef({
			name: name,
			email: email,
			city: city,
			phone: phone,
			password: password,
			account_type: ac_type,
			confirmated: true
		});
		newUser.save().then(() => {
			resolve("Usuário cadastrado com sucesso");
		}).catch((erro) => {
			console.log(erro);
			reject(erro);
		});
	});
}

const userNotExists = (email) => {
	console.log("teste");
	return new Promise((resolve, reject) => {
		UserRef.findOne({email: email}, function(err, user){            
			if (!user && err == null) {
				resolve(true);
			} else if (err) {
				reject(err);
			} else {
				reject("Usuário já cadastrado");
			}
		});
	});
}

const confirmationSucess = (email) => {
	return new Promise((resolve, reject) => {
		UserRef.findOne({email: email}, function(err, user) {            
			if (user) {
				user.confirmated = true;
				user.save(function(error) {
					if (error){
						reject(error);
					} else {
						resolve("Conta confirmada com sucesso.")
					} 
				});
			} else {
				reject(err);
			}
		});
	});
	 
}

const forgotPassword = (email) => {
	return new Promise ((resolve, reject) => {
		userNotExists(email).then(() => {
			reject("Não há nenhum usuário associado à este email.");
		}).catch((err) => {
			if (err =  "Usuário já cadastrado") {
				//sendEmail();
				resolve("Um link com a redefinição de senha foi enviada para o seu email.");
			} else {
				reject(err);
			}
		});
	});
}

const rewritePassword = async (data) => {
	let status;
	await encrypt(data.password).then(async (password) => {
		await UserRef.findOneAndUpdate({email: data.email}, {$set: {password: password}}, (err, todo) => {
			if (err){
				status = err;
			} else {
				status = "A sua senha foi alterada. Faça login novamente.";
			}
		});
	});
	return status;
}

const encrypt = (data) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(data, salt, (err, hash) => {
				if (err) {
					reject (err);
				}

				resolve(hash);
			});
		});
	});
}


module.exports = {
    encrypt: encrypt,
    forgotPassword: forgotPassword,
    confirmationSucess: confirmationSucess,
    userNotExists: userNotExists,
    createUserFromSocial: createUserFromSocial,
	createUserFromEmail: createUserFromEmail,
	rewritePassword: rewritePassword 
}