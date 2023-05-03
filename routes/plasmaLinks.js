const express = require('express');
const router = express.Router();
const PlasmaLink = require("../models/plasmaLink");
const { isLoggedIn,isAuthor } = require('../middleware');

router.get('/', async (req, res) => {
    const plasmaLinks = await PlasmaLink.find({})
    res.render('plasmaLinks/index', { plasmaLinks })
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('plasmaLinks/new')
})

router.post('/', isLoggedIn, async (req, res) => {
    const plasmaLink = new PlasmaLink(req.body.plasmaLink);
    plasmaLink.author = req.user._id;
    await plasmaLink.save();
    req.flash('success', 'Successfully added new data')
    res.redirect(`/plasmaLinks/${plasmaLink._id}`)
})

router.get('/:id', async (req, res) => {
    const plasmaLink = await PlasmaLink.findById(req.params.id).populate('author');
    console.log(plasmaLink);
    res.render('plasmaLinks/show', { plasmaLink });
})

router.get('/:id/edit', isLoggedIn, isAuthor, async (req, res) => {
    const { id } = req.params;
    const plasmaLink = await PlasmaLink.findById(id)
    if (!plasmaLink) {
        req.flash('error', 'Cannot find that data!');
        return res.redirect('/plasmaLinks');
    }
    const plasma = await PlasmaLink.findByIdAndUpdate(id, { ...req.body.plasmaLink });
    res.render('plasmaLinks/edit', { plasmaLink });
})

router.put('/:id', isLoggedIn,isAuthor, async (req, res) => {
    const { id } = req.params;
    const plasmaLink = await PlasmaLink.findByIdAndUpdate(id, { ...req.body.plasmaLink });
    req.flash('success', 'Successfully updated campground!!')
    res.redirect(`/plasmaLinks/${plasmaLink._id}`)
})

router.delete('/:id', isLoggedIn,isAuthor, async (req, res) => {
    const { id } = req.params;
    await PlasmaLink.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted data')
    res.redirect('/plasmaLinks/');
})

module.exports = router;


// Have to handle Errors