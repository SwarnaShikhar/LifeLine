const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donarDriveSchema = new Schema({
    name:String,
    conductedBy:String,
    contactNo:String,
    date:{
        type:Date,
        default:Date.now()
    },
    location:String,
    district:String,
    supportedMedicalTeam:String,
    contactNoMedicalTeam:String,
    description:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('donor',donarDriveSchema);