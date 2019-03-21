

module.exports = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        var errors = []

        // Handle mongoose validation error
        for (field in error.errors) {
            switch (error.errors[field].name) {
                case "ValidatorError":
                    errors.push({
                        field: error.errors[field].path,
                        message: error.errors[field].message
                    })
                    break;
                case "CastError":
                    return next(new Error(`MongooseValidationError: failed to cast ${error.errors[field].path} value "${error.errors[field].value}" to ${error.errors[field].kind}`))
            }
        }
        return res.status(400).json({
            error: {
                type: "ValidationError",
                errors: errors
            }
        })
    } else {
        next(error)
    }
}