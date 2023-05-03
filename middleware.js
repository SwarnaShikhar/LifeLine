module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('success','You must be signed in');
        return res.redirect('/login');
    }
    next()
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isAuthor = async(req,res,next)=>{
    const id = req.params;
    const plasmaLink = await PlasmaLink.findById(id);
    if (!plasmaLink.author.equals(req.user._id)) {
        req.flash('success', 'You do not have permission to do that!!');
        return res.redirect(`/plasmaLinks/${id}`);
    }
    next();
}