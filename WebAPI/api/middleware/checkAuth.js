
const jwt = require('jsonwebtoken');
const FailedAuthException = require('../../exceptions/failed-auth-exception');


module.exports = (req, res, next) => {
    try {
        // Verify authorisation token
        req.userData = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY)
        next()
    }
    catch (error) {
        next(new FailedAuthException())
    }
}