
var PermissionException = require('../../exceptions/permission-exception');

module.exports = (error, req, res, next) => {
    if (error instanceof PermissionException) {
        return res.status(error.status).json({
            error: {
                message: error.message
            }
        })
    } else {
        next(error)
    }
}