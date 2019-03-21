

class FailedAuthException extends Error {

    constructor() {
        super("Request credentials failed authorisation checks.")
        this.status = 401
    }

}

module.exports = FailedAuthException
