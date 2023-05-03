const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlasmaLinkSchema = new Schema({
    name:String,  // title
    group:String,  // price
    location:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model('PlasmaLink',PlasmaLinkSchema);