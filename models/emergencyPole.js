const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emergencyPoleSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:String,
    contactNo:Number,
    district:String,
    location:String,
    needWithIn:Number,
    reason:String,
    needFor:String
})

module.exports = mongoose.model('needy', emergencyPoleSchema);