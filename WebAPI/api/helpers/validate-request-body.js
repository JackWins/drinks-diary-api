
const MissingBodyException = require('../../exceptions/missing-body-exception')

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
            if (!body.hasOwnProperty(argument.name)) {
                throw new MissingBodyException(argument.name)
            }

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

                case Types.Number:
                    // If string, attempt to conver to number
                    if (typeof body[argument.name] === "string") {
                        body[argument.name] = new Number(body[argument.name])
                        if (isNaN(body[argument.name])) {
                            throw new Error(`Invalid data type for argument: ${argument.name}, expected object type Date or ISO formatted date string`)
                        }

                    } else {
                        if (!(body[argument.name] instanceof Number)) {
                            throw new Error(`Invalid data type for argument: ${argument.name}, expected object type Date or ISO formatted date string`)
                        }
                    }

                case Types.Booelan:
                    if (typeof body[argument.name] === "boolean") {
                        throw new Error(`Invalid data type for argument: ${argument.name}, expected object type Date or ISO formatted date string`)
                    }
            }
        })

        // Return potentially updated body
        return body

    } else { throw new MissingBodyException() }
}