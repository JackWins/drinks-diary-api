/**
 * @fileoverview Definitions and Methods for interacting with the 'diary-entries' database model.
 * @author jack.pickett@uea.ac.uk (Jack Pickett)
 */

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
 *          diaryID: string,
 *          drinkType: string,
 *          volume: JSON: {
 *              amount: number,
 *              measure: string,
 *          }
 *          alcoholic: boolean,
 *          caffeinated: boolean
 *      }
 * @returns {Promise} the result of the save operation containing the 
 *      new document or an error to catch.
 */
exports.createEntry = (args) => {
    return new Promise((resolve, reject) => {
        // Check that a diary with the provided ID exists
        DiarysModel.getDiarys(filter = { _id: args.diaryID })
            .then(results => {
                if (results.length > 0) {
                    // Create and save the new diary entry document
                    DiaryEntryModel(args).save()
                        .then(entryDoc => {
                            resolve(entryDoc)
                        })
                        .catch(error => {
                            reject(error)
                        })
                }
                else {
                    reject(new Error("No existing diary with the given ID"))
                }
            })
            .catch(error => {
                reject(error);
            })
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


/**
 * Update the given diary entry with the changes specified in the provided arguments
 * @param {string} entryID is the ObjectId of the entry to update
 * @param {JSON} args is the arguments to change for the specified entry
 * @returns {Promoise} is the promise result of the update query execution
 */
exports.updateDiaryEntry = (entryID, args) => {
    return DiaryEntryModel.findOneAndUpdate(args, { _id: entryID }, { runValidators: true, rawResult: true })
        .exec()
}


/**
 * Remove a diary entry document from the 'diary-entries' collection
 * @param {any} entryID is the ObjectId of the entry to remove from the collection
 * @returns {Promise} is the promise result of the delete query exectution
 */
exports.removeDiaryEntry = (entryID) => {
    return DiaryEntryModel.findByIdAndDelete({ _id: entryID }, { rawResult: true })
        .select('-__v')
        .exec()
}
