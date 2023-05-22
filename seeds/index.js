const mongoose = require('mongoose');
const PlasmaLink = require("../models/plasmaLink");
const datas = require('./data');


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
    await PlasmaLink.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random20 = Math.floor(Math.random() * 20);
        const plasma = new PlasmaLink({
            author: '644fd46768e3fb06ef84e97c',
            name: `${datas[random20].name}`,
            bloodGroup: `${datas[random20].bloodGroup}`,
            location: `${datas[random20].location}`,
            phoneNo: `${datas[random20].phoneNo}`,
            age: `${datas[random20].age}`,
            AadharNo: `${datas[random20].AadharNo}`,
            DistrictName: `${datas[random20].DistrictName}`
        })
        await plasma.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})