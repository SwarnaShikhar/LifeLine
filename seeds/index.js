const mongoose = require('mongoose');
const PlasmaLink = require("../models/plasmaLink");
const datas = require('./data');


mongoose.connect('mongodb://localhost:27017/plasma-link',{
    // useNewUrl:true,
    // useCreateIndex:true,
    useUnifiedtopology:true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", ()=>{
    console.log("Database connected");
});

const seedDB = async()=>{
    await PlasmaLink.deleteMany({});
    for(let i=0; i<10; i++){
        const random10 = Math.floor(Math.random()*10);
        const plasma = new PlasmaLink({
            name:`${datas[random10].name}`,
            group:`${datas[random10].group}`,
            location:`${datas[random10].location}`
        })
        await plasma.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})