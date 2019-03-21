/**
 * @fileoverview Definitions and Methods for interacting with the permissions database model.
 * @author jack.pickett@uea.ac.uk (Jack Pickett)
 */

const mongoose = require('mongoose')
const dbm = require('../../database-manager');
const permissionsSchema = require('./schema');


// Define Model for creating document instances
var PermissionsModel = dbm.getDbConnection().model('Permission', permissionsSchema);


/**
 * Gets the existing roles mapped with permissions.
 * @returns {Promise} which resolves to JSON with the containing the following: 
 *      {
 *          error: boolean,
 *          results: Array of roles (if error == false)
 *          exception: Error instance (if error == true)
 *      }
 * */
exports.getRoles = () => {
    return PermissionsModel.find({}).exec()
        .then(results => {
            return {error: false, roles: results[0].roles}
        })
        .catch(error => {
            return {error: true, exception: error}
        })
}


/**
 * Check if a role has a permission
 * @param {String} role is the role to check permission for
 * @param {String} permission is the permission to check exists for the given role
 * @returns {Promise} a promise which resovles to a JSON containing the error status 
 *      and result of the check, formatted as follows:
 *      {
 *          error: boolean,
 *          result: true if permission exists else false (if error == false)
 *          exception: Error instance (if error == true)
 *      }
 */
exports.checkRolePermission = (role, permission) => {
    PermissionsModel.findOne({'roles.role': role }).exec()
        .then(result => {
            if (result) {
                var match = result.permissions.find((entry) => (entry.permission == permission))
                if (match) {
                    return { error: false, result: true }
                } else {
                    return { error: false, result: false }
                }
            } else {
                return { error: true, exception: new Error("Unable to locate provided role.") }
            }
        })
        .catch(error => {
            return { error: true, exception: error }
        })
}


exports.checkRolePermission = async (role, permission) => {
    const result = await PermissionsModel.findOne({}).exec()

    for (var i = 0; i < result.roles.length; i++) {
        if (result.roles[i].role === role) {
            var match = result.roles[i].permissions.find(element => element === permission)
            if (match) { return true }
            else { return false }
        }
    }
}