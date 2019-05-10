const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Model
const User = require('../../models/User');
const UserRef = mongoose.model('users', User);

const Est = require('../../models/Establishment');
const EstRef = mongoose.model('establishments', Est);

const dbEst = require('./db_establishment');

const sendEmail = require('../email/send');

class DatabaseUser {
	async  createUserFromEmail(data) {
		const newUser = new UserRef(data);
		try {
			await this.userNotExists(newUser.email);
			newUser.password = await this.encrypt(newUser.password);
			await newUser.save();
			return Promise.resolve(true);
		} catch (err) {
			console.log(err)
			return Promise.reject(err);
		}
	}

	async userNotExists(email) {
		return new Promise((resolve, reject) => {
			UserRef.findOne({ email: email }, function (err, user) {
				if (!user && err == null) {
					resolve(true);
				} else if (user) {
					reject("Há um usuário cadastrado com esse endereço de email.");
				}
			});
		});
	}

	async  confirmationSucess(email) {
		try {
			await UserRef.findOne({ email: email })
				.then(user => {
					user.confirmated = true;
					user.save();
				});
			return Promise.resolve("Conta confirmada com sucesso! Faça login para continuar.");
		} catch (err) {
			return Promise.reject("Algum problema aconteceu, tente novamente.");
		}
	}

	async  successfulBilling(id, code) {
		try {
			await UserRef.findById(id)
				.then(user => {
					user.plan = code;
					user.save();
				});
			return Promise.resolve();
		} catch (e) {
			return Promise.reject(e);
		}
	}

	async  forgotPassword(email) {
		try {
			await userNotExists(email);
			return Promise.reject("Não encontramos nenhuma conta com o email informado.");
		} catch (err) {
			if (err.length == 52) {
				const user = await UserRef.findOne({ email: email });
				let params = {
					param1: await encrypt(email),
					param2: await encrypt(user.name)
				}

				params.param1 = params.param1.replace(/[/]+/g, '');
				params.param2 = params.param2.replace(/[/]+/g, '');

				const url = `http://localhost:3001/conta/novasenha/${params.param1}/sk6g/${params.param1}`;

				user.temp_url = url;
				user.save();

				await sendEmail({
					type: "password",
					title: "Sua redefinição de senha chegou",
					action: url,
					email: email
				});

				console.log(url);

				return Promise.resolve(url);
			}
		}
	}

	async  rewritePassword(data) {
		try {
			data.url = data.url.replace("?", "");

			console.log(data);
			const user = await UserRef.findOne({ temp_url: data.url });

			if (data.password != data.cpassword)
				return Promise.reject("As senhas não combinam, tente novamente");

			if (data.password.length < 6)
				return Promise.reject("A senha precisa ser maior que 6 caracteres.");

			user.password = await encrypt(data.password);
			user.temp_url = "false";
			user.save();

			return Promise.resolve("A senha foi alterada, faça login para usar nossos serviços.");

		} catch (err) {
			return Promise.reject("Este pedido de recuperação de senha está expirado. \nPeça um novo em Esqueci Minha Senha na área de login.");
		}
	}


	async  encrypt(data) {
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

	async  getUserInfo(id) {
		console.log(id);
		const data = await UserRef.findById(id).populate({ path: 'establishment' });
		console.log(data);
		return 0;
	}


	async  removePlan(code) {
		console.log(code)
		const user = await UserRef.findOne({ plan: code });

		console.log(user);
		if (user) {
			user.establishment = "";
			user.plan = "";
			await user.save()
		}

	}

	async processNotification(notification) {
		if (notification.status != 'ACTIVE' && notification.status != '3' && notification.status != '4') {
			await UserRef.findOne({plan: notification.code}).populate('establishment')
				.then(async user => {
					console.log(user);
					user.plan = undefined;
					await EstRef.findByIdAndUpdate(user.establishment, {status: false});
					await dbEst.disable(user.establishment);
					user.save();					
				})
		}
	}
}


module.exports = new DatabaseUser();
