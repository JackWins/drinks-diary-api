/**
 * @fileoverview Definitions and Methods for interacting with the 'diaries' database model.
 * @author jack.pickett@uea.ac.uk (Jack Pickett)
 */

const diariesSchema = require('./diaries-schema');
const dbm = require('../../database-manager');

// Define Model for creating document instances
var DiarysModel = dbm.getDbConnection().model('Diary', diariesSchema);
exports.model = DiarysModel


/**
 * Create a new diary document in the 'diarys' collection.
 * @param {any} userID is the ObjectId of the user document associated with the new diary.
 * @param {any} diaryName is the identifying name for the new diary.
 * @param {any} duration is the duration for which the diary is expected to last.
 */
exports.createDiary = (userID, diaryName, duration) => {

    var newDiary = new DiarysModel({
        userID: userID,
        diaryName: diaryName,
    })

    // Set duration and endDate if there is a duration provided
    if (duration !== undefined) {
        currentDate = new Date()
        newDiary.duration = duration
        newDiary.endDate = currentDate.addDays(duration)
    }

    return newDiary.save()
}

/**
 * Find diary documents mathcing the given filter if specified
 * @param {any} filter optional parameter containing field values to filter results
 * @returns {Promise} promise with the result or error depending on result
 */
exports.getDiarys = (filter = {}) => {
    return DiarysModel.find(filter).exec()
}
