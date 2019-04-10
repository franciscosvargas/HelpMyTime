const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Model
const Est = require('../../models/Establishment');
const User = require('../../models/User');
const Service = require('../../models/Establishment');

const EstRef = mongoose.model('establishments', Est);
const ServiceRef = mongoose.model('establishments', Service);
const UserRef = mongoose.model('users', User);

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
        console.log(data.owner);
        const user = await UserRef.findById(data.owner);
        await notExists(data.business_id);
        const newEst = await EstRef.create(data);
        user.establishment = newEst;
        user.save();
    } catch (err) {
        console.log(err);
    }
}

async function createService(data) {
    
}
async function getEst(id) {
    const Est = await EstRef.findById(id);
    return Est;
}


module.exports = {
    notExists: notExists,
    createEst: createEst,
    getEst: getEst
}
