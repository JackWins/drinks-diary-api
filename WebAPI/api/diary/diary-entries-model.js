/**
 * @fileoverview Definitions and Methods for interacting with the 'diary-entries' database model.
 * @author jack.pickett@uea.ac.uk (Jack Pickett)
 */

const NoResultException = require('../../exceptions/no-result-exception');
const diaryEntrysSchema = require('./diary-entries-schema');
const DiarysModel = require('./diaries-model');
const dbm = require('../../database-manager');

// Define Model for creating document instances
var DiaryEntryModel = dbm.getDbConnection().model('Diary-Entry', diaryEntrysSchema);


/**
 * Create a new diary entry document associated with a given existing diary
 * @param {JSON} args are the arguments required to create a new entry,
 *      the structure should be the following: 
 *      {
 *          drinkName: String,
 *          brand: Strinng (optional),
 *          volume: JSON: { amount: Number, measure: String },
 *          containsAlcohol: Boolean,
 *          alcoholPercentage: Number (optional),
 *          containsCaffeine: Boolean,
 *          caffeineContent: Number (optional),
 *      }
 * @returns {Promise} the result of the save operation containing the 
 *      new document or an error to catch.
 */
exports.createEntry = async (userId, diaryId, args) => {
    // Use filter to search for diaries matching a provided user ID
    const results = await DiarysModel.getDiarys({ _id: diaryId, userID: userId })
    if (results < 1) {
        throw new NoResultException("No diaries matching the provided diary ID to create entry for")
    }

    // Create diary entry document
    return DiaryEntryModel({...args, diaryID: diaryId}).save()
}


/**
 * Update the given diary entry with the changes specified in the provided arguments
 * @param {String} userID is the ObjectId of the user who owns the targeted diary
 * @param {String} diaryId is the ObjectId of the target diary
 * @param {String} entryID is the ObjectId of the targer entry ObjectId
 * @param {JSON} args are the arguments to change for the specified entry
 * @returns {Promoise} is the promise result of the update query execution
 */
exports.updateEntry = (userId, diaryId, entryID, args) => {
    // Use filter to search for diaries matching a provided user ID
    return new Promise((resolve, reject) => {
        DiarysModel.getDiarys({ _id: diaryId, userID: userId })
            .then(results => {
                if (results) {
                    DiaryEntryModel.findByIdAndUpdate(entryID, args)
                        .then(doc => {
                            // doc is the unupdated document, so retrieve document after update
                            DiaryEntryModel.findOne({ _id: doc._id }).exec()
                                .then(result => resolve(result))
                        })
                        .catch(error => reject(error))
                }
                else {
                    throw new NoResultException("No diaries matching the provided diary ID to create entry for")
                }
            })
            .catch(error => { reject(error) })
    })
}


/**
 * Remove a diary entry document from the 'diary-entries' collection
 * @param {String} userID is the ObjectId of the user who owns the targeted diary
 * @param {String} diaryId is the ObjectId of the target diary
 * @param {String} entryID is the ObjectId of the targer entry ObjectId
 * @returns {Promise} is the promise result of the delete query exectution
 */
exports.removeEntry = (userId, diaryId, entryID) => {
    return new Promise((resolve, reject) => {
        DiarysModel.getDiarys({ _id: diaryId, userID: userId })
            .then(diarys => {
                if (diarys.length > 0) {
                    DiaryEntryModel.findByIdAndDelete({ _id: entryID, diaryID: diaryId }).exec()
                        .then(entry => {
                            resolve(entry)
                        })
                        .catch(error => reject(error))
                }
            })
            .catch(error => reject(error))
    })
}


/**
 * Retrieve diary entry documents from the collection
 * @param {JSON} filter contains key value pairs for filter the query results
 * @returns {Promise} the promise result of the query funciton
 */
exports.getDiaryEntries = (filter = {}) => {
    return DiaryEntryModel.find(filter)
        .select('-__v')
        .exec()
}




