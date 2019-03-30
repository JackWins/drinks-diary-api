

var BodyValidationException = require('../../exceptions/body-validation-exception');

module.exports = (error, req, res, next) => {
    if (error instanceof BodyValidationException) {
        if (error.field) {
            res.status(error.status).json({
                field: error.field,
                type: "BodyValidationException",
                message: `${error.field} is a mandatory field.`
            })
        }
    } else {
        next(error)
    }
}