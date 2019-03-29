const mongoose = require('mongoose');

const Establishment = mongoose.Schema ({

	name: {
		type: String,
		require: true
	},
	owner: {
		type: String,
		require: true
	},
	adress: {
		type: String,
		require: true
	},
	juristic_id: {
		type: Number,
		require:true
	},
	phone: {
		type: Number,
		require: true
	},
	facilites: {
		type: Object,
		require: true
	},
	logo: {
		type: String,
		require: false
	},
	rank: {
		type: Number,
		require: true,
		default: 0,
	}
})

module.exports = Establishment;