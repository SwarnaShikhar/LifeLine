const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emergencyPoleSchema = new Schema({
    name:String,
    email:String,
    contactNo:String,
    district:String,
    location:String,
    needWithIn:String,
    reason:String,
    needFor:String
})

module.exports = mongoose.model('needy', emergencyPoleSchema);