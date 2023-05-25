const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlasmaLinkSchema = new Schema({
    name:String,  // title
    bloodGroup:String,  // price
    location:String,
    phoneNo:String,
    age:Number,
    AadharNo:String,
    DistrictName:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model('PlasmaLink',PlasmaLinkSchema);