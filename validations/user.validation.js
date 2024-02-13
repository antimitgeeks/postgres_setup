const schema = require('./schema/user.schema.js');
const statusCode = require('../constants/statusCode.js');

exports.registerValidation = async (req, res, next) => {
    const { error } = schema.registerSchema.validate(req.body);
    if (error) {
        res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
    } else {
        next();
    }
}
