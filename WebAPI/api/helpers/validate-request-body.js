
const BodyValidationException = require('../../exceptions/body-validation-exception')

const Types = Object.freeze({
    String: "string",
    Number: "number",
    Boolean: "boolean",
    Date: "date"
})
exports.Types = Types

exports.validateRequestBody = async (body, expectedArguments) => {
    if (body) {
        await expectedArguments.forEach(argument => {
            // Set required status as true if undefined in expected argument
            const required = (argument.required === undefined) ? true : argument.required

            // Check if the argument is present
            if (!body.hasOwnProperty(argument.name) && required) {
                throw new BodyValidationException(argument.name, `Missing argument: ${argument.name} is a mandatory field.`)
            } else if ( !body.hasOwnProperty(argument.name)  && !required) {
                return
            }

            // Perform generic validation on the argument dependent on type
            switch (argument.type) {
                case Types.String:
                    if (typeof body[argument.name] !== argument.type) {
                        // TODO: Implement exception
                        throw new Error(`Invalid data type for argument: ${argument.name}, expected type ${argument.type}`)
                    }
                    break;

                case Types.Date:
                    // If string, attempt to convert to date
                    if (typeof body[argument.name] === "string") {
                        body[argument.name] = new Date(body[argument.name])
                        if (isNaN(body[argument.name])) {
                            throw new Error(`Invalid data type for argument: ${argument.name}, expected object type Date or ISO formatted date string`)
                        }

                    } else {
                        if (!(body[argument.name] instanceof Date)) {
                            throw new Error(`Invalid data type for argument: ${argument.name}, expected object type Date or ISO formatted date string`)
                        }
                    }
                    break;

                case Types.Number:
                    // If string, attempt to conver to number
                    if (typeof body[argument.name] === "string") {
                        body[argument.name] = new Number(body[argument.name])
                        if (isNaN(body[argument.name])) {
                            throw new Error(`Invalid data type for argument: ${argument.name}, expected object Number or number string representation`)
                        }

                    } else {
                        if (!(body[argument.name] instanceof Number) && typeof (body[argument.name]) !== "number" ) {
                            throw new Error(`Invalid data type for argument: ${argument.name}, expected object type Number`)
                        }
                    }
                    break;

                case Types.Booelan:
                    if (typeof body[argument.name] === "boolean") {
                        throw new Error(`Invalid data type for argument: ${argument.name}, expected boolean type`)
                    }
                    break;
            }
        })

        // Return potentially updated body
        return body

    } else { throw new MissingBodyException() }
}