const mongoose = require('mongoose');

const Category = mongoose.Schema ({

	name: {
		type: String,
		require: true
	},
	slug: {
		type: String,
		require: true
	},
	rank: {
		type: Number,
		require: true,
	}
})

module.exports = Category;