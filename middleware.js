const Joi = require('joi')
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('success','You must be signed in');
        return res.redirect('/login');
    }
    next()
}

module.exports.validatePlasmaLink = (req, res, next) => {
    const plasmaLinkSchema = Joi.object({
        plasmaLink: Joi.object({
            name: Joi.string().required(),
            age: Joi.number().required().min(1)
        }).required()
    })
    const { error } = plasmaLinkSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
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