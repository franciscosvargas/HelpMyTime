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
	account_type: {
		type: String,
		require: true,
		default: "email"
	},
	plan: {
		type: Boolean,
		require: true,
		default: false

	},
	confirmated: {
		type: Boolean,
		require: true,
		default: false
	}
})

module.exports = User;