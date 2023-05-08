const mongoose = require('mongoose');
const EmergencyPole = require("../models/emergencyPole");
const pole = require('./pole');


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
    await EmergencyPole.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random10 = Math.floor(Math.random() * 10);
        const pol = new EmergencyPole({
            // author: '644fd46768e3fb06ef84e97c',
            name: `${pole[random10].name}`,
            email: `${pole[random10].email}`,
            contactNo: `${pole[random10].contactNo}`,
            district: `${pole[random10].district}`,
            location: `${pole[random10].location}`,
            needWithIn: `${pole[random10].needWithIn}`,
            reason: `${pole[random10].reason}`,
            needFor: `${pole[random10].needFor  }`
        })
        await pol.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})