
class ValidationException extends Error {

    constructor(field, reason) {
        super(`Failed to validate ${field}: ${reason}`)
        this.type = this.constructor.name
        this.reason = reason
        this.field = field
    }   
    
}

module.exports = ValidationException;