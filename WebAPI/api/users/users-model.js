/**
 * @fileoverview Definitions and Methods for interacting with the users database model.
 * @author jack.pickett@uea.ac.uk (Jack Pickett)
 */

const mongoose = require('mongoose')
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
 * @returns {Promise} a promise resolving with the inserted document
 */
exports.createUser = (newUser) => {
    // Create new document instance using the passed arguments
    var newUser = new UsersModel(newUser);
    // Run validation before encrypting password
    var isValid = newUser.validateSync()
    // Check if a mongoose Validation Error was returned
    if (isValid) { throw isValid }

    // Encrypt and append password to new user model
    newUser.password = bcrypt.hashSync(newUser.password, 12);

    // Store the new user document in the database, 
    // disable validation as password will fail
    return newUser.save({ validateBeforeSave: false })
};


/**
 * Verify the username password combination provided is valid
 * @param {string} email email value of the target user doucment
 * @param {string} password password to check validity against the matching user docuemnt
 * @param {function} callback is a function for further processing of the result
 * @return {promise | undefined} promise when callback is undefined otherwise returned undefined
 */
exports.verifyCredentials = function (email, password) {
    // Get the user document matching the provided email address
    return new Promise(resolve => { 
        UsersModel.findOne({ email: email }).select('_id email password role').exec()
            .then(userDoc => {
                if (userDoc) {
                    // Check passwords
                    bcrypt.compare(password, userDoc.password)
                        .then(checkResult => {
                            resolve({check: checkResult, user: userDoc})
                        })
                } else {
                    resolve({ check: false, user: userDoc })
                }
            })
    })
}



/**
 * Update the user with the provided id with the given role
 * @param {String} userId the _id of the user to update
 * @param {String} role the value of the new role
 * @returns {Promise} a promise which resolves to a json with the format: 
 *      {
 *          error: true on error false on success,
 *          result: updated document on success (when error == false),
 *          exception: Error instance (when error == true)
 *      }
 */
exports.setRole = (userId, role) => {
    return UsersModel.findOneAndUpdate({ '_id': userId }, { 'role': role }).exec()
        .then(updatedDoc => {
            if (updatedDoc) {
                return {
                    error: false,
                    result: updatedDoc
                }
            } else {
                throw new Error("User with the given ID does not exist.")
            }
        })
        .catch(error => {
            return {
                error: true,
                exception: error
            }
        })
}


/**
 * Find a user document from the database matching the given filter arguments.
 * @param {JSON} filter Contains arguments to be used as database filter.
 * @param {function} callback is a function for further processing the query result.
 */
exports.getUsers = (filter) => {
    return UsersModel.find(filter)
        .select('-__v -password')
        .exec();
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



