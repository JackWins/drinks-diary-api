
var FailedAuthException = require('../../exceptions/failed-auth-exception');

module.exports = (error, req, res, next) => {
    if (error instanceof FailedAuthException) {
        return res.status(401).json({
            error: {
                message: error.message
            }
        })
    } else {
        next(error)
    }
}