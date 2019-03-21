// Credit: https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016


const asyncHandler = handlerFunc => (req, res, next) => {
    Promise.resolve(handlerFunc(req, res, next))
        .catch(next)
}

module.exports = asyncHandler
