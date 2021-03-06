const mongoose = require('mongoose');

const Establishment = mongoose.Schema ({

	name: {
		type: String,
		require: true
	},
	slug: {
		type: String,
		require: true
	},
	status: {
		type: Boolean,
		require: true,
		default: true
	},
	owner: {
		type: String, 
		require: true
	},
	business_name: {
		type: String,
		require: true
	},
	business_id: {
		type: String,
		require: true
	},
	cep: {
		type: Number,
		require: true
	},
	address: {
		type: String,
		require: true
	},
	uf_city: {
		type: String,
		require: true
	}, 
	phone: {
		type: String,
		require: true
	},
	feature_acessibility: {
		type: Boolean,
		require: true,
		default: false
	},
	feature_air_conditioner: {
		type: Boolean,
		require: true,
		default: false
	},
	feature_wifi: {
		type: Boolean,
		require: true,
		default: false
	},
	feature_park: {
		type: Boolean,
		require: true,
		default: false
	},
	feature_acessibility: {
		type: Boolean,
		require: true,
		default: false
	},
	payment_method_money: {
		type: Boolean,
		require: true,
		default: false
	},
	payment_method_credit_card: {
		type: Boolean,
		require: true,
		default: false
	},
	payment_method_debit_card: {
		type: Boolean,
		require: true,
		default: false
	},
	payment_method_check: {
		type: Boolean,
		require: true,
		default: false
	},
	addtional_info: {
		type: String,
		require: false
	},
	logo: {
		type: Buffer,
		require: false
	},
	services: [{type: mongoose.Schema.Types.ObjectId, ref: 'services'}]
});

module.exports = Establishment;