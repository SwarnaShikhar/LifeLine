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
            name: Joi.string().min(3).max(30).required(),
            age: Joi.number().required().min(1).required(),
            location:Joi.string().alphanum().min(5).required(),
            bloodGroup:Joi.string().required(),
            phoneNo:Joi.number().min(10).required(),
            AadharNo:Joi.number().min(12).required(),
            DistrictName:Joi.string().required()
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

module.exports.donarDriveSchema = (req,res,next)=>{
    const donarDriveSchema = Joi.object({
        donarDrive:Joi.object({
            name:Joi.string().min(3).max(30).required(),
            conductedBy:Joi.string().min(3).max(30).required(),
            contactNo:Joi.number().min(10).required(),
            date:Joi.required(),
            location:Joi.string().min(5).required(),
            district:Joi.string().required(),
            supportedMedicalTeam:Joi.string(),
            contactNoMedicalTeam:Joi.number().required(),
            description:Joi.string().min(10).required()
        }).required()
    })
    const { error } = donarDriveSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.emergencyPoleSchema = (req, res, next) => {
    const emergencyPoleSchema = Joi.object({
        emergencyPole: Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            contactNo:Joi.number().min(10).required(),
            district:Joi.string().required(),
            location:Joi.string().min(5).required(),
            needWithIn:Joi.number().min(1).required(7),
            reason:Joi.string().min(10).required(),
            needFor:Joi.string(),
        }).required()
    })
    const { error } = emergencyPoleSchema.validate(req.body);
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