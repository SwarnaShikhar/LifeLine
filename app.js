const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const PlasmaLink = require("./models/plasmaLink");
const plasmaLink = require("./models/plasmaLink");


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

const app = express();

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));

app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/plasmaLinks', async(req,res)=>{
    const plasmaLinks = await PlasmaLink.find({})
    res.render('plasmaLinks/index',{plasmaLinks})
})

app.get('/plasmaLinks/new',(req,res)=>{
    res.render('plasmaLinks/new')
})

app.post('/plasmaLinks',async(req,res)=>{
    const plasmaLink = new PlasmaLink(req.body.plasmaLink);
    await plasmaLink.save();
    res.redirect(`/plasmaLinks/${plasmaLink._id}`)
})

app.get('/plasmaLinks/:id', async(req,res)=>{
    const plasmaLink = await PlasmaLink.findById(req.params.id)
    res.render('plasmaLinks/show',{plasmaLink});
})

app.get('/plasmaLinks/:id/edit', async(req,res)=>{
    const plasmaLink = await PlasmaLink.findById(req.params.id)
    res.render('plasmaLinks/edit',{plasmaLink});
})

app.put('/plasmaLinks/:id',async(req,res)=>{
    const{id} = req.params;
    const plasmaLink =await PlasmaLink.findByIdAndUpdate(id,{...req.body.plasmaLink});
    res.redirect(`/plasmaLinks/${plasmaLink._id}`)
})

app.delete('/plasmaLinks/:id',async(req,res)=>{
    const{id} = req.params;
    await PlasmaLink.findByIdAndDelete(id);
    res.redirect('/plasmaLinks/');
})




app.listen(3000, ()=>{
    console.log("App is Listening on Port 3000!!!")
})

















// campground.js ==> plasmaLisnk.js
// Campground ==> PlasmaLink
// CampgroundSchema ==> PlasmaLinkSchema   
// makecampground ==> makePlasmaLink
// campgrounds ==> plasmalinks
// cities ==> datas
// camp ==> plasma (from the seed/index.js file)