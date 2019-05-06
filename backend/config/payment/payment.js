const request = require("request");
const credentials = require('./credentials.json');
const parseString = require('xml2js').parseString;
const db_User = require('../database/db_users');

class PaymentController {

	adherence(data, id) {
		console.log(data)
		const options = {
			url: `${credentials.preapprovals}?email=${credentials.email}&token=${credentials.token_sandbox}`,
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': credentials.json_endpoint,
				'Accept': credentials.accept_json
			},
			json: true
		}

		return new Promise((resolve, reject) => {
			request(options, async function (error, response, body) {
				if (body.error) reject(body.error);
				if (error) reject(error);

				console.log(body);
				await db_User.successfulBilling(id, body.code);
				resolve(true);
			});
		});

	}

	async createSession() {
		const options = {
			url: `${credentials.session}?email=${credentials.email}&token=${credentials.token_sandbox}`,
			method: 'POST',
			headers: {
				'Content-Type': credentials.url_endpoint
			}
		}

		return new Promise((resolve) => {
			request(options, function (error, response, body) {
				if (error) throw new Error(error);
				parseString(body, function (err, result) {
					resolve(result.session.id[0]);
				});
			});
		})
	}

	checkNotification(notification) {

		console.log(notification);

		const options = {
			url: `${credentials.notification_preapprovals}/${notification.notificationCode}?email=${credentials.email}&token=${credentials.token_sandbox}`,
			method: 'GET',
			headers: {
				'Content-Type': credentials.url_endpoint,
				'Accept': credentials.accept_json
			}
		}

		return new Promise((resolve) => {
			request(options, function (error, response, body) {
				if (error) throw new Error(error);

					body = JSON.parse(body)
					const transaction = {
						code: body.code,
						status: body.status
					}

					console.log(transaction);

					if (transaction.status != "ACTIVE" && transaction.status != "PENDING")
						db_User.removePlan(transaction.code);

				
			});
		});


	}
}

module.exports = new PaymentController();