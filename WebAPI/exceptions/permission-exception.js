

class PermissionException extends Error {
    constructor() {
        super("Permission deined. You do not have permission to access this content.")
        this.status = 403
    }
}

module.exports = PermissionException