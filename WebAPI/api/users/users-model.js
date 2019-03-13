/**
 * @fileoverview Definitions and Methods for interacting with the users database model.
 * @author jack.pickett@uea.ac.uk (Jack Pickett)
 */

const bcrypt = require('bcrypt');
const usersSchema = require('./schema');
const dbm = require('../../database-manager');

// Define Model for creating document instances
var UsersModel = dbm.getDbConnection().model('User', usersSchema);


/**
 * Create and save a new user document to mongoDB
 * @param {JSON} newUser contains the arguments required to create a user,
 *      the following stucture should be followed:
 *      {
 *          email: string,
 *          password: string,
 *          forename: string,
 *          surname: string,
 *          gender: string,
 *          dob: date
 *      }
 * @returns {Promise} a promise containing error on failure or new user document on success
 */
exports.createUser = function (newUser) {

    // Create new document instance using the passed arguments
    var newUser = new UsersModel(newUser);

    // Store the new user document in the database
    return new Promise(function (resolve, reject) {
        newUser.save((error, user) => {
            if (error)
                reject(error);

            // Encrypt password with bcrypt for secure storage and update doc
            user.password = bcrypt.hashSync(user.password, 12);
            user.save(options = { validateBeforeSave: false }, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve(user)
                }
            })
        })
    });
};


/**
 * Find a user document from the database matching the given filter arguments.
 * @param {JSON} filter Contains arguments to be used as database filter.
 * @param {function} callback is a function for further processing the query result.
 */
exports.getUsers = function (filter = {}, callback) {
    UsersModel.find(filter)
        // Filter fields to be returned in results
        .select('-__v -password')
        .exec(callback);
}


/**
 * Updates the specified user document with the given update arguments.
 * @param {string} objectId is the ObjectId of the target user docuemnt
 * @param {JSON} arguments contains the field, value combinations to update the document with.
 */
exports.updateUser = function (objectId, arguments = {}) {

}


/**
 * Remove the specified user from the database including related documents in other collections.
 * @param {string} objectId is the ObjectId of the target user document
 */
exports.removeUser = function (objectId) {

}


/**
 * Verify the username password combination provided is valid
 * @param {string} email email value of the target user doucment
 * @param {string} password password to check validity against the matching user docuemnt
 * @param {function} callback is a function for further processing of the result
 * @return {promise | undefined} promise when callback is undefined otherwise returned undefined
 */
exports.verifyCredentials = function (email, password, callback) {
    // Return promise
    if (callback === undefined) {
        var queryPromise = UsersModel.findOne({ email: email }).select('_id email password').exec()
        return new Promise((resolve, reject) => {
            queryPromise.then(
                // Resolve
                result => {
                    if (!result) {
                        resolve({ check: false })
                    }
                    bcrypt.compare(password, result.password).then((checkResult) => {
                        resolve({
                            check: checkResult,
                            userDoc: result
                        });
                    })
                },
                // Reject
                error => {
                    reject(error)
                }
            )
        })
    }
    // Use provided callback
    else {
        var queryPromise = UsersModel.findOne({ email: email }).select('_id email password').exec(
            // Resolve
            (result) => {
                if (!result) {
                    callback(error, false, result)
                    return
                }
                bcrypt.compare(password, result.password).then((checkResult) => {
                    callback(error, checkResult, result)
                })
            },
            //Reject
            (error) => {
                callback(error, null)
            }
        )
    }
}
