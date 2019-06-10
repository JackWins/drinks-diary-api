
const mongoose = require("mongoose")
const dbManager = require("../database-manager")
const connection = dbManager.getDbConnection()


// Write permissions to database
const PermissionsSchema = new mongoose.Schema(
    definition = {
        permissions: [
            new mongoose.Schema({
                permission: String,
                description: String
            }, { _id: false })
        ],
        roles: [
            new mongoose.Schema({
                role: String,
                permissions: [String]
            }, {_id: false})
        ]
    },
    options = {_id: true}
);


const PermissionsModel = connection.model('Permissions', PermissionsSchema)
const permissionsEntry = new PermissionsModel(require('./permissions.json'))
permissionsEntry.save()
    .then(document => {
        console.log("Created permissions entry")
    })
    .catch(error => {
        console.log(error.message)
    })


// Write volumes to database
const volModel = require('../api/volumes/volumes-model')
volModel.generateVolumes()


