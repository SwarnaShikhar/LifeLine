const express = require('express');
const router = express.Router();
const PlasmaLink = require("../models/plasmaLink");
const DonarDrive = require('../models/donarDrive');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const EmergencyPole = require('../models/emergencyPole');
const { isLoggedIn, isAuthor, validatePlasmaLink, donarDriveSchema, emergencyPoleSchema } = require('../middleware');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = 'pk.eyJ1Ijoic3dhcm5hNDAzIiwiYSI6ImNsaHl6Mmh1NjE4bjYzaXFhYTdreDIyZGoifQ.NFzAM7uKPFVOx4LS8Nor0A';
const geocoder = mbxGeocoding({accessToken:mapBoxToken})
const Joi = require('joi');



router.get('/', (req, res) => {
    res.render('plasmaLinks/home')
})

router.get('/welcome', (req, res) => {
    res.render('plasmaLinks/welcome')
})

router.get('/plasmaLinks', async (req, res) => {
    const plasmaLinks = await PlasmaLink.find(req.query)
    res.render('plasmaLinks/index', { plasmaLinks })
})

router.get('/plasmaLinks/new', isLoggedIn, (req, res) => {
    res.render('plasmaLinks/new')
})

router.post('/plasmaLinks', validatePlasmaLink, isLoggedIn, catchAsync(async (req, res) => {
    const plasmaLink = new PlasmaLink(req.body.plasmaLink);
    plasmaLink.author = req.user._id;
    await plasmaLink.save();
    req.flash('success', 'Successfully added new data')
    res.redirect('/plasmaLinks/donar')
}))


















//////////////////////////////////////////////////////////////////////////////
// Start of Donar Page Routes
router.get('/plasmaLinks/donar', (req, res) => {
    res.render('donarPage/donar')
})

router.get('/plasmaLinks/donar/donarspot', async (req, res) => {
    const donarSpots = await DonarDrive.find({})
    res.render('donarPage/donarspot', { donarSpots })
})

router.get('/plasmaLinks/donar/crisis', (req, res) => {
    res.render('donarPage/crisisZone')
})


router.get('/plasmaLinks/donar/dremedy', (req, res) => {
    res.render('donarPage/remedy')
})

router.get('/plasmaLinks/donar/ecrisis', (req, res) => {
    res.render('donarPage/ecrisis')
})

router.get('/plasmaLinks/donar/talkie', (req, res) => {
    res.render('donarPage/talkie')
})

router.get('/plasmaLinks/donar/donarDrive', async (req, res) => {
    const donarDrive = await DonarDrive.find(req.query)
    res.render('donarPage/donarDrive')
})

router.post('/plasmaLinks/donar/donarDrive',donarDriveSchema, catchAsync(async (req, res) => {
    const donarDrive = new DonarDrive(req.body.donarDrive);
    // plasmaLink.author = req.user._id;
    await donarDrive.save();
    req.flash('success', 'Your application has been submitted successfully ! You can go ahead with your noble motive')
    // res.redirect(`/plasmaLinks/${plasmaLink._id}`)
    res.redirect('/plasmaLinks/donar')
}))
// End of Donar Page routes
//////////////////////////////////////////////////////////////////////



/////////////////API/////////////////////////

router.get('/plasmaLinksData', async (req, res) => {
    const plasmaLinks = await PlasmaLink.find(req.query)
    res.send(plasmaLinks);
})

router.get('/plasmaLinks/donar/donarDriveData', async (req, res) => {
    const donarDrive = await DonarDrive.find(req.query)
    res.send(donarDrive);
})

router.get('/plasmaLinks/needy/emergencyPoleData', async (req, res) => {
    const emergencyPole = await EmergencyPole.find(req.query)
    res.send(emergencyPole);
})


/////////////////////////////////////////////////////////////////////////











//////////////////////////////////////////////////////////////////////
// Start of Needy Page Routes
router.get('/plasmaLinks/needy', (req, res) => {
    res.render('needyPage/needy')
})

router.get('/plasmaLinks/needy/emergencyPole', (req, res) => {
    res.render('needyPage/emergencyPole')
})

router.post('/plasmaLinks/needy/emergencyPole',emergencyPoleSchema, catchAsync(async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query:req.body.emergencyPole.location,
        limit:1
    }).send()
    const emergencyPole = new EmergencyPole(req.body.emergencyPole);
    emergencyPole.geometry = geoData.body.features[0].geometry;
    await emergencyPole.save();
    console.log(emergencyPole);
    res.redirect('/plasmaLinks/needy')
}))

router.get('/plasmaLinks/needy/bloodPool', (req, res) => {
    res.render('needyPage/bloodPool')
})

router.get('/plasmaLinks/needy/groupFinder', (req, res) => {
    res.render('needyPage/groupFinder')
})

router.get('/plasmaLinks/needy/nremedy', (req, res) => {
    res.render('needyPage/nremedy')
})

// End of Needy Page Routes
//////////////////////////////////////////////////////////////////////


////  in future for the needy people
router.get('/plasmaLinks/:id', async (req, res) => {
    const plasmaLink = await PlasmaLink.findById(req.params.id).populate('author');
    // console.log(plasmaLink);
    res.render('plasmaLinks/show', { plasmaLink });
})

router.get('/plasmaLinks/:id/edit', isLoggedIn, isAuthor, async (req, res) => {
    const { id } = req.params;
    const plasmaLink = await PlasmaLink.findById(id)
    if (!plasmaLink) {
        req.flash('error', 'Cannot find that data!');
        return res.redirect('/plasmaLinks');
    }
    const plasma = await PlasmaLink.findByIdAndUpdate(id, { ...req.body.plasmaLink });
    res.render('plasmaLinks/edit', { plasmaLink });
})

router.put('/plasmaLinks/:id', isLoggedIn, isAuthor, async (req, res) => {
    const { id } = req.params;
    const plasmaLink = await PlasmaLink.findByIdAndUpdate(id, { ...req.body.plasmaLink });
    req.flash('success', 'Successfully updated campground!!')
    res.redirect(`/plasmaLinks/${plasmaLink._id}`)
})

router.delete('/plasmaLinks/:id', isLoggedIn, isAuthor, async (req, res) => {
    const { id } = req.params;
    await PlasmaLink.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted data')
    res.redirect('/plasmaLinks/');
})



///////////Error Handeling///////////


router.all('*', (req, res, next) => {
    // res.send("404!!!")
    next(new ExpressError('Page Not Found', 404))
})

router.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something went wrong!!'
    res.status(statusCode).render('error', { err })
})


module.exports = router;