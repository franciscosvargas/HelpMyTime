const mongoose = require('mongoose');

const Service = mongoose.Schema ({
	name: {
		type: String,
		require: true
	},
	category: {
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
	owner: {
		type: mongoose.Schema.Types.ObjectId, ref: 'establishments'
	},
	horary: [{type: mongoose.Schema.Types.ObjectId, ref: 'schedules'}]
	

})

module.exports = Service;