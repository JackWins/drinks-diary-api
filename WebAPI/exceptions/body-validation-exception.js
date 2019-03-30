

class BodyValidationException extends Error {

    constructor(field, message) {
        super(message || "The request body failed validation checks")
        this.field = field
        this.status = 400
    }

}

module.exports = BodyValidationException