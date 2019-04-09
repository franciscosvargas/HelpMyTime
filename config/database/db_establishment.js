const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbUser = require('./db_users');
// Model
const Est = require('../../models/Establishment');
const EstRef = mongoose.model('establishment', Est);

function notExists(business_id) {
    return new Promise((resolve, reject) => {
        EstRef.findOne({business_id: business_id})
            .then(est => {
                if(!est) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
            .catch(error => {reject(error)});
    });
}

async function createEst(data) {
    try {
        const newEst = new EstRef(data);
        await notExists(data.business_id);
        await newEst.save();
	await dbUser.changePlan(data.owner);

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    notExists: notExists,
    createEst: createEst
}
