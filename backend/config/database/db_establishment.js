const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const hmh = require('hmh');
// Model
const Est = require('../../models/Establishment');
const User = require('../../models/User');
const Service = require('../../models/Service');
const Schedule = require('../../models/Schedule');

const EstRef = mongoose.model('establishments', Est);
const ServiceRef = mongoose.model('services', Service);
const UserRef = mongoose.model('users', User);
const ScheduleRef = mongoose.model('schedules', Schedule);

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
		const Est = await EstRef.findById(id).populate('services');
		return Est;
	} catch (e) {
		return (error)
	}

}

//Service functions
async function createService(data, id) {
	const Est = await EstRef.findById(id);
	data.owner = Est;
	data.owner_name = Est.name;
	const Service = await ServiceRef.create(data);

	Est.services.push(Service);
	await Est.save();
	return Promise.resolve();
}

async function getService(id) {
	const Service = await ServiceRef.findById(id).populate({
		path: 'horary'
	});

	return Service;
}

async function searchService(term) {
	var regex = new RegExp(term, 'i');
	var criteria = {$or: [ {name: regex}, {category: regex}, {description: regex}, {owner_name: regex} ]}
	const service = await ServiceRef.find(criteria);

	return service;

}
async function getServiceBySchedule(id) {
	try {
		const Service = await ServiceRef.findOne({horary: id});
		return Service;
	} catch (e) {
		return "error";
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

// Statistics functions
async function getStatistics(id) {
	try {
		const back = {
			establishment: [],
			horary: [],
			nextClients: []
		}
		const Est = await getEst(id);

		for (let i = 0; i < Est.services.length; i++) {
			const service = await getService(Est.services[i]._id);
			Est.services[i].horary = service.horary;
		}

		if (Est.services) {
			const availability = getAvailabilityOfTheServices(Est.services);
			back.horary = getHoraryInfo(Est.services);
			back.nextClients = getNextClients(Est.services);

			for (let i = 0; i < Est.services.length; i++) {
				Est.services[i].text = availability[i].text;
				Est.services[i].class = availability[i].class;
			}
		}

		back.establishment = Est;
		return Promise.resolve(back);

	} catch (error) {
		console.log("Error: " + error);

	}
}

function getHoraryInfo(services) {
	try {
		const data = {
			today_open: 0,
			today_closed: 0,
			week_open: 0,
			week_closed: 0
		}

		const date = new Date();

		//Get array of services
		for (let i = 0; i < services.length; i++) {
			//Get one service to extract data
			const service = services[i];
			//Get array of schedules	
			for (let i = 0; i < service.horary.length; i++) {
				//Extract and verify data from especific horary

				if (service.horary[i].haveClient && service.horary[i].day == date.getDay() && !service.horary[i].finished)
					data.today_open++;
				if (service.horary[i].finished && service.horary[i].day == date.getDay())
					data.today_closed++;
				if (service.horary[i].haveClient && service.horary[i].day > date.getDay() && !service.horary[i].finished)
					data.week_open++;
				if (service.horary[i].finished && service.horary[i].day < date.getDay())
					data.week_closed++;
			}
		}

		console.log(data);
		data.week_open = data.week_open + data.today_open;
		data.week_closed = data.week_closed + data.today_closed;
		return data;
	} catch (error) {
		return Promise.reject(error);
	}
}

function getNextClients(services) {
	let clients = [];
	try {
		//Get especific establishment
		const date = new Date();

		//Get and scroll a array of services from especfic establishment
		for (let i = 0; i < services.length; i++) {
			//Get especific service to extract data
			const service = services[i];
			//Get and scroll a array from schedules
			for (let i = 0; i < service.horary.length; i++) {
				let client = {};
				//Verify if there is a customer for today and your care did not happen
				if (service.horary[i].haveClient && service.horary[i].day == date.getDay() && !service.horary[i].finished) {
					//Divide time in two parts, hours and minuts
					let time = service.horary[i].time.split(':');
					client.service = service.name;
					client.min = time[1];
					client.hour = time[0];
					client.name = "Maria";
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
		return clients.slice(0, 1);
	} catch (e) {
		return Promise.reject(e);
	}
}

function getAvailabilityOfTheServices(services) {
	//Get reference from especific establishment
	const date = new Date();

	const schedules = [];

	for (let i = 0; i < services.length; i++) {
		const service = services[i];
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


	for (let i = 0; i < schedules.length; i++) {
		if ((schedules[i].all / 2) == schedules[i].haveclient) {
			schedules[i].class = "medium";
			schedules[i].text = "Média";
		} else if ((schedules[i].all / 2) < schedules[i].haveclient) {
			schedules[i].class = "low";
			schedules[i].text = "Baixa";
		} else if ((schedules[i].all / 2) > schedules[i].haveclient) {
			schedules[i].class = "high";
			schedules[i].text = "Alta";
		}
	}

	return schedules;

}

// Schedules Functions
async function createSchedule(data) {
	try {
		const est = await getEst(data.id);

		if (data.services.length > est.services.length) {
			data.services = [data.services];
		}

		for (let i = 0; i < data.days.length; i++) {
			const schedule = await ScheduleRef.create({ time: data.time, day: data.days[i] });
			for (let i = 0; i < data.services.length; i++) {
				const service = await getService(data.services[i]);
				service.horary.push(schedule);
				await service.save();
			}
		}
		return Promise.resolve();
	} catch (error) {
		return Promise.reject();
	}
}

async function getSchedules(estid) {
	//Get establishment information 
	const days = { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] };
	/* try { */
	const Est = await getEst(estid);
	const schedules = { all: [], unique: [] }
	let i = 0;

	Est.services.forEach(service => {
		service.horary.forEach(horary => {
			schedules.all.push(`${horary}`);
		});
	});
	// Remove the duplicates schedules 
	schedules.unique = schedules.all.filter(onlyUnique);

	// Get complete information from schedules
	schedules.all = [];
	
	
	await Promise.all(schedules.unique.map(async (schedule) => {
		const final = await ScheduleRef.findById(schedule).populate('client');
		switch (final.day) {
			case 0:
				days.sunday.push(final);
				break;
			case 1:
				days.monday.push(final);
				break;
			case 2:
				days.tuesday.push(final);
				break;
			case 3:
				days.wednesday.push(final);
				break;
			case 4:
				days.thursday.push(final);
				break;
			case 5:
				days.friday.push(final);
				break;
			case 6:
				days.saturday.push(final);
				break;
		}
	}));

	if (days.monday.length > 0)
		days.monday = sortSchedulesByTime(days.monday);
	if (days.tuesday.length > 0)
		days.tuesday = sortSchedulesByTime(days.tuesday);
	if (days.wednesday.length > 0)
		days.wednesday = sortSchedulesByTime(days.wednesday);
	if (days.thursday.length > 0)
		days.thursday = sortSchedulesByTime(days.thursday);
	if (days.friday.length > 0)
		days.friday = sortSchedulesByTime(days.friday);
	if (days.saturday.length > 0)
		days.saturday = sortSchedulesByTime(days.saturday);
	if (days.sunday.length > 0)
		days.sunday = sortSchedulesByTime(days.sunday);

	return days;
	/* } catch (e) {
		return days;
	} */

}
async function getSchedulesFromClient(id){
	const days = { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] };
	const schedules = await ScheduleRef.find({client: id}).populate('client');
	schedules.forEach(final => {
		switch (final.day) {
			case 0:
				days.sunday.push(final);
				break;
			case 1:
				days.monday.push(final);
				break;
			case 2:
				days.tuesday.push(final);
				break;
			case 3:
				days.wednesday.push(final);
				break;
			case 4:
				days.thursday.push(final);
				break;
			case 5:
				days.friday.push(final);
				break;
			case 6:
				days.saturday.push(final);
				break;
		}
		
	});

	if (days.monday.length > 0)
		days.monday = sortSchedulesByTime(days.monday);
	if (days.tuesday.length > 0)
		days.tuesday = sortSchedulesByTime(days.tuesday);
	if (days.wednesday.length > 0)
		days.wednesday = sortSchedulesByTime(days.wednesday);
	if (days.thursday.length > 0)
		days.thursday = sortSchedulesByTime(days.thursday);
	if (days.friday.length > 0)
		days.friday = sortSchedulesByTime(days.friday);
	if (days.saturday.length > 0)
		days.saturday = sortSchedulesByTime(days.saturday);
	if (days.sunday.length > 0)
		days.sunday = sortSchedulesByTime(days.sunday);

	return days;
}
function sortSchedulesByTime(array) {
	const date = new Date();
	for (let i = 0; i < array.length; i++) {
		const hour = array[i].time.split(':');
		//Convert the time to remaining time to service
		var time = hmh.diff(`${hour[0]}h ${hour[1]}m`, `06h 00m`, `minutes`).m;
		array[i].remaining = time;
		//Arrange the array from the lowest to the highest time
		array.sort(function (a, b) {
			return (a.remaining > b.remaining) ? 1 : ((b.remaining > a.remaining) ? -1 : 0);
		});
	}

	return array;
}

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

async function reschedule(id) {
	const service = await ServiceRef.findOne({horary: id});
	const schedule = await ScheduleRef.findById(id).populate('client');
	const data = {
		usuario: schedule.client.name,
		estabelecimento: service.owner_name,
		horario: schedule.time,
		servico: service.name,
		email: schedule.client.email,
		title: `${service.name} foi desmarcado.`,
		type: 'rescheduling'
	};

	await ServiceRef.updateMany({horary: id}, { $pullAll: {'horary': [id] } } );
	await ScheduleRef.findByIdAndRemove(id);
	
	return data;
}

async function markoff(id) {
	await ServiceRef.updateMany({horary: id}, { $pullAll: {'horary': [id] } } );
	await ScheduleRef.findByIdAndRemove(id);

	return true;

}

module.exports = {
	notExists: notExists,
	createEst: createEst,
	createService: createService,
	getEst: getEst,
	updateService: updateService,
	getService: getService,
	createSchedule: createSchedule,
	getStatistics: getStatistics,
	getSchedules: getSchedules,
	getServiceBySchedule: getServiceBySchedule,
	searchService: searchService, 
	reschedule: reschedule,
	getSchedulesFromClient: getSchedulesFromClient,
	markoff: markoff
}
