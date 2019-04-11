const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
		console.log(data.owner);
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
async function getEst(id) {
	const Est = await EstRef.findById(id).populate({
		path: 'services'});
	return Est;
}


module.exports = {
	notExists: notExists,
	createEst: createEst,
	createService: createService,
	getEst: getEst,
}
