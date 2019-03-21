
const mongoose = require('mongoose');


var permissionsSchema = new mongoose.Schema(
    definition = {
        permissions: [{
            permission: {
                type: mongoose.Schema.Types.String,
                required: [true, "permission identifier is mandatory for a permission entry"]
            },
            description: {
                type: mongoose.Schema.Types.String,
                required: [true, "permission description is mandatory for a permission entry"]
            }
        }],
        
        roles: [{
            role: {
                type: mongoose.Schema.Types.String,
                required: [true, "A role name is mandatory for a role entry"]
            },
            permissions: [String]
        }]

    },
    options = {
        _id: true,
    }
);


module.exports = permissionsSchema;