const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['applied', 'interviewing','offer','rejected'],
        default: 'applied',
    },
    dateApplied: {
        type: Data,
        default: Date.now,
    },
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;