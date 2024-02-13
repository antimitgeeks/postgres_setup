const Joi = require('joi');

exports.registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    isadmin: Joi.number().allow(0, 1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    CompanyId: Joi.number().allow(null).required(),
    transport_id: Joi.number().allow(null).required(),
    user_image: Joi.string().required(),
    user_image_id: Joi.number().allow(null).optional(),
});