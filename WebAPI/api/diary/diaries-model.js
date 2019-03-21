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
 * @param {any} userID is the ObjectId of the user document associated with the new diary.
 * @param {any} diaryName is the identifying name for the new diary.
 * @param {any} duration is the duration for which the diary is expected to last.
 * @return {Promise} a promise which resolves to the stored diary document
 */
exports.createDiary = (userID, diaryName, duration) => {
    // Initialise new diary model
    var newDiary = new DiarysModel({userID: userID, diaryName: diaryName,})

    // Set duration and endDate
    var endDate = new Date()
    newDiary.endDate = endDate.setDate(endDate.getDate() + duration)
    newDiary.duration = duration
    
    return new Promise((resolve, reject) => {
        var count = 0;
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
