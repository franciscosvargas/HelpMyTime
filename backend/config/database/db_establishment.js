const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const hmh = require('hmh');
// Model
const Est = require('../../models/Establishment');
const User = require('../../models/User');
const Service = require('../../models/Service');

const EstRef = mongoose.model('establishments', Est);
const ServiceRef = mongoose.model('services', Service);
const UserRef = mongoose.model('users', User);

function notExists(business_id) {
	return new Promise((resolve, reject) => {
		EstRef.findOne({ business_id: business_id })
			.then(est => {
				if (!est) {
					resolve(true);
				} else {
					reject(false);
				}
			})
			.catch(error => { reject(error) });
	});
}

async function createEst(data) {
	try {
		const user = await UserRef.findById(data.owner);
		await notExists(data.business_id);
		const newEst = await EstRef.create(data);
		user.establishment = newEst;
		user.save();
	} catch (err) {
		console.log(err);
	}
}

async function createService(data, id) {
	const Est = await EstRef.findById(id);
	const Service = await ServiceRef.create(data);

	Est.services.push(Service);
	await Est.save();
	return Promise.resolve();
}

async function getService(id) {
	const Service = await ServiceRef.findById(id);
	return Service;
}

async function getHoraryInfo(id) {
	try {
		const data = {
			today_open: 0,
			today_closed: 0,
			week_open: 0,
			week_closed: 0
		}
		const est = await EstRef.findById(id);
		const date = new Date();

		for (let i = 0; i < est.services.length; i++) {
			const service = await ServiceRef.findById(est.services[i]._id);

			for (let i = 0; i < service.horary.length; i++) {
				if (service.horary[i].haveclient && service.horary[i].day == date.getDay())
					data.today_open++;
				if (service.horary[i].finished && service.horary[i].day == date.getDay())
					data.today_closed++;
				if (service.horary[i].haveclient && service.horary[i].day > date.getDay())
					data.week_open++;
				if (service.horary[i].finished && service.horary[i].day < date.getDay())
					data.week_closed++;
			}
		}

		data.week_open = data.week_open + data.today_open;
		data.week_closed = data.week_closed + data.today_closed;
		return Promise.resolve(data);
	} catch (error) {
		return Promise.reject(error);
	}

}

async function getNextClients(id) {
	let clients = [];
	try {
		const est = await EstRef.findById(id);
		const date = new Date();

		for (let i = 0; i < est.services.length; i++) {
			const service = await ServiceRef.findById(est.services[i]._id);
			for (let i = 0; i < service.horary.length; i++) {
				let client = {};
				if (service.horary[i].haveclient && service.horary[i].day == date.getDay() && !service.finished){
					let time = service.horary[i].time.split(':');
					client.service = service.name;
					client.min = time[1];
					client.hour = time[0]; 
					client.name = service.horary[i].clientName;
					clients.push(client);
				}
			} 
		}

		for (let i = 0;  i < clients.length; i++) {
			var time = hmh.diff(`${clients[i].hour}h ${clients[i].min}m`, `${date.getHours()}h ${date.getMinutes()}m`, `minutes`).m;
			clients[i].time = time;

			clients.sort(function (a, b) {
				return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);
			});
		}

		return Promise.resolve(clients.slice(0,3));
	} catch (e) {
		return Promise.reject(e);
	}
}

async function updateService(data) {
	try {
		await ServiceRef.findOneAndUpdate({ _id: data.id }, { $set: data });
		return Promise.resolve();
	} catch (e) {
		console.log(e);
		return Promise.reject(e);
	}

}

async function scheduleService(id) {
	try {

		const horary = {
			time: "10:30",
			haveclient: false
		}

		const service = await ServiceRef.findById(id);

		service.horary.push(horary);
		await service.save();
		return Promise.resolve(true);
	} catch (e) {
		return Promise.reject(e);
	}
}
async function getEst(id) {
	const Est = await EstRef.findById(id).populate({
		path: 'services'
	});
	return Est;
}

module.exports = {
	notExists: notExists,
	createEst: createEst,
	createService: createService,
	getEst: getEst,
	updateService: updateService,
	getService: getService,
	scheduleService: scheduleService,
	getHoraryInfo: getHoraryInfo,
	getNextClients: getNextClients
}
