const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate'); // https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22291500#overview
const session = require("express-session");
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/user')

const plasmalinkRoutes = require('./routes/plasmaLinks');
const userRoutes = require('./routes/users')

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

const app = express();

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/',userRoutes);
app.use('/', plasmalinkRoutes)

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(3000, () => {
    console.log("App is Listening on Port 3000!!!")
})

















// campground.js ==> plasmaLisnk.js
// Campground ==> PlasmaLink
// CampgroundSchema ==> PlasmaLinkSchema
// makecampground ==> makePlasmaLink
// campgrounds ==> plasmalinks
// cities ==> datas
// camp ==> plasma (from the seed/index.js file)