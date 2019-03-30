/**
 * @fileoverview Definitions and Methods for interacting with the 'diaries' database model.
 * @author jack.pickett@uea.ac.uk (Jack Pickett)
 */

// Library imports
const diariesSchema = require('./diaries-schema');
// Local imports
const dbm = require('../../database-manager');

// Define Model for creating document instances
var DiarysModel = dbm.getDbConnection().model('Diary', diariesSchema);
exports.model = DiarysModel


/**
 * Create a new diary document in the 'diarys' collection.
 * @param {String} userID is the ObjectId of the user document associated with the new diary.
 * @param {String} diaryName is the identifying name for the new diary.
 * @param {Date} startDate date diary commences recording
 * @param {Date} endDate date diary finishes recording
 * @return {Promise} a promise which resolves to the stored diary document
 */
exports.createDiary = (userID, diaryName, startDate, endDate) => {
    // Initialise new diary model
    var newDiary = new DiarysModel({ userID, diaryName, startDate, endDate })

    // Calculate duration
    var difference = Math.abs(endDate.getTime() - startDate.getTime())
    newDiary.duration = Math.ceil(difference / (1000 * 3600 * 24))
    
    return new Promise((resolve, reject) => {
        newDiary.save()
            .then(diaryEntry => {
                resolve(diaryEntry)
            })  
            .catch(error => {
                return reject(error)
            })
    })
}

exports.createDiaryFromTemplate = (diaryTemplateId) => {
    var test = "test"
    // TODO: complete
}


/**
 * Find diary documents mathcing the given filter if specified
 * @param {any} filter optional parameter containing field values to filter results
 * @returns {Promise} promise with the result or error depending on result
 */
exports.getDiarys = (filter = {}) => {
    return DiarysModel.find(filter).exec()
}
