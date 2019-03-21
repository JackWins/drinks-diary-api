
class MissingBodyException extends Error {

    constructor(field) {
        super(!field ? "Missing body in request." : `Expected argument: ${field} in request body`)
        this.field = field
        this.status = 400
    }

}

module.exports = MissingBodyException