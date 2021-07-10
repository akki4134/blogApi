const Joi = require('joi')

const registerValidation = data => {

    const schema = Joi.object({

        username: Joi.string()
            .alphanum().min(4).max(30).required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        phonenumber: Joi.string()
            .length(10).pattern(/^[0-9]+$/).required()
    });

    return schema.validate(data)
}

const loginValidation = data => {

    const schema = Joi.object({

        username: Joi.string()
            .alphanum().min(4).max(30).required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });

    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation