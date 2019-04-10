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
		type: Number,
		require: true
	},
	end_time: {
		type: Number,
		require: true
	}

})

module.exports = Service;