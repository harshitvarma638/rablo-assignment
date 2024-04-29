const Joi = require('joi');

const userRegisterValidate = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        username: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).alphanum().required(),
    });
    const {error, value} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({message:"Bad Request", error: error.details[0].message});
    }
    next();
};

const userLoginValidate = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).alphanum().required(),
    });
    const {error, value} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({message:"Bad Request", error: error.details[0].message});
    }
    next();
}

module.exports = { userRegisterValidate, userLoginValidate };