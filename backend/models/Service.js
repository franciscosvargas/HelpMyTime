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
	location: {
		type: String
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId, ref: 'establishments'
	},
	owner_name: {
		type: String
	},
	owner_slug: {
		type: String

	},	
	horary: [{type: mongoose.Schema.Types.ObjectId, ref: 'schedules'}]
	

})

module.exports = Service;