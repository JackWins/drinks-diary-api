
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        req.userData = jwt.verify(req.headers.authorization, process.env.JWT_KEY)

        if (req.params.hasOwnProperty('userID') && req.params.userID != req.userData._id) {
            next(new Error("Authorisation not permitted", status=403))
        }

        next()
    }
    catch (error) {
        error = new Error()
        error.message = "Failed to authenticate token."
        error.status = 401
        next(error)
    }
}