const mongoose = require("mongoose")

mongoose.connect(
    `mongodb+srv://Jack:daHl6iA1tdujysdY@drinksdiarycluster-t6hop.mongodb.net/DrinksDiary?retryWrites=true`,
    { useNewUrlParser: true }
)


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

/*
const PermissionsModel = mongoose.model('Permissions', PermissionsSchema)
const permissionsEntry = new PermissionsModel(require('./permissions.json'))
permissionsEntry.save()
    .then(document => {
        console.log("Created permissions entry")
    })
    .catch(error => {
        console.log(error.message)
    })
*/


// Write volumes to database
const volModel = require('../api/volumes/volumes-model')
volModel.generateVolumes()


