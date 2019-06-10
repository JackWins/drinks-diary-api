/**
 * @fileoverview Implementation of routes for interfacing with the users model.
 * @author jack.pickett@uea.ac.uk (Jack Pickett)
 */

const jwt = require('jsonwebtoken');
const router = require('express').Router();

const usersModel = require('./users-model');
const permissionsModel = require('../permissions/model')

const jsonParser = require('body-parser').json();
const authCheck = require('../middleware/checkAuth');
const asyncHandler = require('../middleware/async-handler')
const BodyValidator = require('../helpers/validate-request-body')

const PermissionException = require('../../exceptions/permission-exception')
const FailedAuthException = require('../../exceptions/failed-auth-exception')


/**
 * Async Handler
 * Retrieves the user document associated with the requesting account
 */
router.get('/getUser', authCheck, asyncHandler(async (req, res, next) => {
    // Retrieve requested user account information
    const results = await usersModel.getUsers({ _id: req.userData._id })
    if (!results) { throw new Error("Unable to find user with the provided id") }
    // Send response to client
    return res.status(200).json(results[0])
}));


/**
 * Async Handler 
 * Creates a new user within the database on request
 */
router.post('/createUser', jsonParser, asyncHandler(async (req, res, next) => {
    const expectedArguments = [
        { name: "email", type: BodyValidator.Types.String },
        { name: "password", type: BodyValidator.Types.String },
        { name: "forename", type: BodyValidator.Types.String },
        { name: "surname", type: BodyValidator.Types.String },
        { name: "gender", type: BodyValidator.Types.String },
        { name: "dob", type: BodyValidator.Types.Date },
    ]

    // Check validity of request body
    req.body = await BodyValidator.validateRequestBody(req.body, expectedArguments)
    // Create new user in the database
    var newUser = await usersModel.createUser(req.body)
    // Send response to use
    return res.status(200).json({})
}));


/**
 * Async Handler 
 * Updates the deails of the requesting user within the database on request
 */
router.post('/updateUser', jsonParser, asyncHandler(async (req, res, next) => {
    const expectedArguments = [
        { name: "email", type: BodyValidator.Types.String },
        { name: "password", type: BodyValidator.Types.String },
        { name: "forename", type: BodyValidator.Types.String },
        { name: "surname", type: BodyValidator.Types.String },
        { name: "gender", type: BodyValidator.Types.String },
        { name: "dob", type: BodyValidator.Types.Date },
    ]

    // Check validity of request body
    req.body = await BodyValidator.validateRequestBody(req.body, expectedArguments)
    // TODO: complete handler
}));


/**
 * Async Handler 
 * Deletes the requesting users account
 */
router.post('/deleteUser', jsonParser, asyncHandler(async (req, res, next) => {

}));


/**
 * Async Handler
 * Retrieves the user document with the provided ObjectId
 */
router.get('/getUser/:userId', authCheck, asyncHandler(async (req, res, next) => {
    // Check permission if the userId of the requesting 
    // account does not match the target userId
    if (req.userData._id !== req.params.userId) {
        const hasPermission = await permissionsModel.checkRolePermission(req.userData.role, "canViewUserAccount")
        if (!hasPermission) {
            throw new PermissionException()
        }
    }

    // Retrieve requested user account information
    const results = await usersModel.getUsers({ _id: req.params.userId })
    if (!results) { throw new Error("Unable to find user with the provided id") }
    // Send response to client
    return res.status(200).json(results[0])
}));


/**
 * Async Handler 
 * Updates the deails of the specified user within the database on request
 */
router.post('/updateUser/:userId', jsonParser, asyncHandler(async (req, res, next) => {
    const expectedArguments = [
        { name: "email", type: BodyValidator.Types.String },
        { name: "password", type: BodyValidator.Types.String },
        { name: "role", type: BodyValidator.Types.String }
    ]

    // Check permissions
    // TODO: complete handler
}));


/**
 * Async Handler 
 * Deletes the targeted user account from the database
 */
router.post('/deleteUser/:userId', jsonParser, asyncHandler(async (req, res, next) => {

}));


/*
 * Async Handler
 * Verifies the validity of an email and password combination 
 * passed through the request body
 */
router.post('/verifyCredentials', jsonParser, asyncHandler(async (req, res, next) => {
    const expectedArguments = [
        { name: "email", type: BodyValidator.Types.String },
        { name: "password", type: BodyValidator.Types.String },
    ]

    // Check validity of request body
    req.body = await BodyValidator.validateRequestBody(req.body, expectedArguments)
    // Check credentials
    var result = await usersModel.verifyCredentials(req.body.email, req.body.password)

    if (result.check) {
        console.log(result.user)
        return res.status(200).json({
            role: result.user.role,
            userId: result.user._id,
            authToken: jwt.sign(result.user.toObject(), process.env.JWT_KEY, { expiresIn: "1h" })
        })
    } else {
        throw new FailedAuthException()
    }
}));


/**
 * Sync Handler
 * Returns response with status 200 if the token provided in
 * the authorization header passes the authenticity check.
 */
router.get('/verifyToken', authCheck, (req, res, next) => {
    // If the request gets to this point it has passed authentication middlware, return status 200
    return res.status(200).send()
});



module.exports = router