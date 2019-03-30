
const mongoose = require("mongoose")
const VolumesSchema = require("./volumes-schema")
const dbm = require("../../database-manager")

const VolumesModel = dbm.getDbConnection().model('Volumes', VolumesSchema);


/**
 * Load the volume entries contained within the volumes.json
 * in the same directory into the database.
 * */
exports.generateVolumes = () => {
    require("./volumes.json").forEach(volumeEntry => {
        console.log(volumeEntry)
        VolumesModel.findOneAndUpdate({ key: volumeEntry.key }, volumeEntry, {upsert: true})
            .then(response => {})
            .catch(error => {
                console.log(error)
            })
    })
}


/**
 * Retrieves the stored volumes from the Volumes database collection
 * @returns {Array} a list of JSON objects representing each volume document returned
 *      from the search query.
 */
exports.getVolumes = async () => {
    return await VolumesModel.find().select("-__v -_id").exec()
}


/**
 * Retrieve the volume document with the provided key.
 * @returns {JSON} a document containing the matching the collection query with the provided key
 */
exports.getVolumeByKey = async (key) => {
    return await VolumesModel.findOne({ key: key }).select("-__v -_id").exec()
}