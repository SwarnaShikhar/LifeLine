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
    for (let i = 0; i < 20; i++) {
        const random20 = Math.floor(Math.random() * 20);
        const pol = new EmergencyPole({
            // author: '644fd46768e3fb06ef84e97c',
            name: `${pole[random20].name}`,
            email: `${pole[random20].email}`,
            contactNo: `${pole[random20].contactNo}`,
            district: `${pole[random20].district}`,
            geometry:{
                type:"Point",
                coordinates:[pole[random20].geometry.coordinates[1],pole[random20].geometry.coordinates[0]]
            },
            location: `${pole[random20].location}`,
            needWithIn: `${pole[random20].needWithIn}`,
            reason: `${pole[random20].reason}`,
            needFor: `${pole[random20].needFor  }`
        })
        await pol.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})