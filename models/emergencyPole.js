const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emergencyPoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    contactNo: Number,
    district: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    location: String,
    needWithIn: Number,
    reason: String,
    needFor: String
})

module.exports = mongoose.model('needy', emergencyPoleSchema);