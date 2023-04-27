const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlasmaLinkSchema = new Schema({
    name:String,  // title
    group:String,  // price
    location:String
});

module.exports = mongoose.model('PlasmaLink',PlasmaLinkSchema);