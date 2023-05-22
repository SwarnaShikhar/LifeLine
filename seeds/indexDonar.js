const mongoose = require('mongoose');
const DonorDrive = require("../models/donarDrive");
const donar = require('./donar');


mongoose.connect('mongodb://localhost:27017/plasma-link', {
    // useNewUrl:true,
    // useCreateIndex:true,
    useUnifiedtopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await DonorDrive.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random20 = Math.floor(Math.random() * 20);
        const don = new DonorDrive({
            // author: '644fd46768e3fb06ef84e97c',
            name: `${donar[random20].name}`,
            conductedBy: `${donar[random20].conductedBy}`,
            location: `${donar[random20].location}`,
            district: `${donar[random20].district}`,
            contactNo: `${donar[random20].contactNo}`,
            date: `${donar[random20].date}`,
            supportedMedicalTeam: `${donar[random20].supportedMedicalTeam}`,
            contactNoMedicalTeam: `${donar[random20].contactNoMedicalTeam}`,
            description:`${donar[random20].description}`
        })
        await don.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})