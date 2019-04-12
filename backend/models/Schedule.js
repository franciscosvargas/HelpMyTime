const mongoose = require('mongoose');

const Schedule = mongoose.Schema ({
    time: {
        type: String,
        require: true
    },
    haveClient: {
        type: Boolean,
        require: true,
        default: false
    },
    finished: {
        type: Boolean,
        require: true,
        default: false
    },
    day: {
        type: Number,
        require: true
    },
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
	
});

module.exports = Schedule;