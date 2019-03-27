
const jwt = require('jsonwebtoken');
const FailedAuthException = require('../../exceptions/failed-auth-exception');


module.exports = (req, res, next) => {
    try {
        // Verify authorisation token
        req.userData = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY)
        next()
    }
    catch (error) {
        if (error.name !== "TokenExpiredError" || error.name !== "JsonWebTokenError" || error.name !== "NotBeforeError") {
            // TODO: log system error
            console.log(error)
        }
        next(new FailedAuthException())
    }
}