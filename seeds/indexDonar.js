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
    for (let i = 0; i < 10; i++) {
        const random10 = Math.floor(Math.random() * 10);
        const don = new DonorDrive({
            // author: '644fd46768e3fb06ef84e97c',
            name: `${donar[random10].name}`,
            conductedBy: `${donar[random10].conductedBy}`,
            location: `${donar[random10].location}`,
            contactNo: `${donar[random10].contactNo}`,
            date: `${donar[random10].date}`,
            supportedMedicalTeam: `${donar[random10].supportedMedicalTeam}`,
            contactNoMedicalTeam: `${donar[random10].contactNoMedicalTeam}`,
            description:`${donar[random10].description}`
        })
        await don.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})