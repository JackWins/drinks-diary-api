
const mongoose = require('mongoose');


var usersSchema = new mongoose.Schema(
    definition = {
        email: {
            type: String,
            unique: true,
            match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            required: [true, 'Email address is a mandatory field']
        },

        password: {
            type: String,
            minlength: 8,
            maxlength: 72,
            match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
            required: [true, 'Password is a mandatory field']
        },

        forename: {
            type: String,
            match: /^(?=.*[a-zA-Z])/,
            required: [true, 'Forename is a mandatory field']
        },

        surname: {
            type: String,
            match: /^(?=.*[a-zA-Z])/,
            required: [true, 'Surname is a mandatory field']
        },

        gender: {
            type: String,
            enum: ['Male', 'Female'],
            required: [true, 'Gender is a mandatory field']
        },

        dob: {
            type: Date,
            validate: {
                isAsync: true,
                validator: validateDob,
                message: 'Date of Birth of failed validation.'
            },
            required: [true, 'Date of birth is a mandatory field']
        },
    },
    options = {
        _id: true,
    }
);


function validateDob() {
    return true;
}


module.exports = usersSchema;