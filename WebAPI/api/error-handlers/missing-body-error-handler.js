

var MissingBodyException = require('../../exceptions/missing-body-exception');

module.exports = (error, req, res, next) => {
    if (error instanceof MissingBodyException) {
        if (error.field) {
            res.status(error.status).json({
                field: error.field,
                type: "MissingBodyArgument",
                message: `${error.field} is a mandatory field.`
            })
        } else {
            res.status(error.status).json({
                type: "MissingBody",
                message: error.message
            })
        }
    } else {
        next(error)
    }
}