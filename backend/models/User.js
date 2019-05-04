const mongoose = require('mongoose');

const User = mongoose.Schema ({

	name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	}, 
	cep: {
		type: String,
		require: true
	},
	uf: {
		type: String,
		require: true
	},
	city: {
		type: String,
		require: true
	}, 
	phone: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	confirmated: {
		type: Boolean,
		require: true,
		default: false
	}, 
	establishment: {
		type: mongoose.Schema.Types.ObjectId, ref: 'establishments'
	},
	temp_url: {
		type: String
	},
	plan: {
		type: String
	}
})

module.exports = User;