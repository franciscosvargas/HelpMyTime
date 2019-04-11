const mongoose = require('mongoose');

const Service = mongoose.Schema ({
	name: {
		type: String,
		require: true
	},
	Category: {
		type: String,
		require: true
	},
	description: {
		type: String,
	},
	price: {
		type: Number,
		require: true
	},
	duration: {
		type: Number,
		require: true,
		default: 30
	},
	start_time: {
		type: String,
		require: true
	},
	end_time: {
		type: String,
		require: true
	}

})

module.exports = Service;