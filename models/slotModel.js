// models/slotModel.js

const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    availableDoses: {
        type: Number,
        required: true,
    },
    firstDoseRegisteredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    secondDoseRegisteredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

module.exports = mongoose.model('Slot', slotSchema);
