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


// Establishment Functions
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

async function getEst(id) {
	try {
		const Est = await EstRef.findById(id).populate({
			path: 'services'
		});
		return Est;
	} catch (e) {
		return false;
	}

}

//Service functions
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

async function updateService(data) {
	try {
		await ServiceRef.findOneAndUpdate({ _id: data.id }, { $set: data });
		return Promise.resolve();
	} catch (e) {
		console.log(e);
		return Promise.reject(e);
	}

}

// Statistics functions

async function getHoraryInfo(id) {
	try {
		const data = {
			today_open: 0,
			today_closed: 0,
			week_open: 0,
			week_closed: 0
		}
		// Get Establishment Reference
		const est = await EstRef.findById(id);
		const date = new Date();

		//Get array of services
		for (let i = 0; i < est.services.length; i++) {
			//Get one service to extract data
			const service = await ServiceRef.findById(est.services[i]._id);

			//Get array of schedules
			for (let i = 0; i < service.horary.length; i++) {
				//Extract and verify data from especific horary
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
		//Get especific establishment
		const est = await EstRef.findById(id);
		const date = new Date();

		//Get and scroll a array of services from especfic establishment
		for (let i = 0; i < est.services.length; i++) {
			//Get especific service to extract data
			const service = await ServiceRef.findById(est.services[i]._id);
			//Get and scroll a array from schedules
			for (let i = 0; i < service.horary.length; i++) {
				let client = {};
				//Verify if there is a customer for today and your care did not happen
				if (service.horary[i].haveclient && service.horary[i].day == date.getDay() && !service.finished) {
					//Divide time in two parts, hours and minuts
					let time = service.horary[i].time.split(':');
					client.service = service.name;
					client.min = time[1];
					client.hour = time[0];
					client.name = service.horary[i].clientName;
					// Push current modified schedule to new local array
					clients.push(client);
				}
			}
		}

		//Get local array of schedules
		for (let i = 0; i < clients.length; i++) {
			//Convert the time to remaining time to service
			var time = hmh.diff(`${clients[i].hour}h ${clients[i].min}m`, `${date.getHours()}h ${date.getMinutes()}m`, `minutes`).m;
			clients[i].time = time;

			//Arrange the array from the lowest to the highest time
			clients.sort(function (a, b) {
				return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);
			});
		}

		// Send only 4 clients 
		return Promise.resolve(clients.slice(0, 3));
	} catch (e) {
		return Promise.reject(e);
	}
}

async function setAvailabilityOfTheServices(id) {
	//Get reference from especific establishment
	const est = await EstRef.findById(id);
	const date = new Date();

	const schedules = [];

	for (let i = 0; i < est.services.length; i++) {
		const service = await ServiceRef.findById(est.services[i]._id);
		const objSchedules = {
			all: 0,
			haveclient: 0,
			class: "null",
			text: "null"
		}
		for (let i = 0; i < service.horary.length; i++) {
			if (service.horary[i].day == date.getDay())
				objSchedules.all++;
			if (service.horary[i].day == date.getDay() && service.horary[i].haveclient)
				objSchedules.haveclient++;
		}
		schedules.push(objSchedules);
	}

	
	for (let i = 0; i < schedules.length; i++){
		if ((schedules[i].all / 2) == schedules[i].haveclient) {
			schedules[i].class = "medium";
			schedules[i].text = "Média";
		} else if ((schedules[i].all / 2) < schedules[i].haveclient){
			schedules[i].class = "low";
			schedules[i].text = "Baixa";
		} else if ((schedules[i].all / 2) > schedules[i].haveclient){
			schedules[i].class = "high";
			schedules[i].text = "Alta";
		}
	}
	
	return Promise.resolve(schedules);


}
// Beta functions
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


module.exports = {
	notExists: notExists,
	createEst: createEst,
	createService: createService,
	getEst: getEst,
	updateService: updateService,
	getService: getService,
	scheduleService: scheduleService,
	getHoraryInfo: getHoraryInfo,
	getNextClients: getNextClients,
	setAvailabilityOfTheServices: setAvailabilityOfTheServices
}
