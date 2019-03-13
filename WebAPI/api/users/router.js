/**
 * @fileoverview Implementation of routes for interfacing with the users model.
 * @author jack.pickett@uea.ac.uk (Jack Pickett)
 */

const jwt = require('jsonwebtoken');
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const usersModel = require('./users-model');
const authCheck = require('../middleware/checkAuth');


router.get('/', authCheck, function (req, res, next) {
    results = usersModel.getUsers(filter = {}, function (error, result) {
        // Handle errors retrieving users from the database
        if (error) {
            error.reason = error.message
            error.message = "Unable to retrieve users from the database"
            next(error);
        }

        res.status(200).json({
            "count": result.length,
            "result": result
        })
    })
});


router.get('/:userID', authCheck, function (req, res, next) {
    results = usersModel.getUsers(filter = { _id: req.params.userID }, function (error, result) {
        // Handle errors retrieving users from the database
        if (error) {
            error.reason = error.message
            error.message = "Unable to retrieve users from the database"
            next(error);
        }

        var responseJson = { "count": result.length }
        if (result.length > 0) {
            responseJson.result = result
        } else {
            responseJson.message = "No user matching given ID"
        }

        res.status(200).json(responseJson);
    })

});


router.post('/createUser', jsonParser, function (req, res, next) {
    // Check that the incoming request has content in its body
    if (!req.body) {
        error = new Error()
        error.code = 400
        error.message = "Missing body in request"
    }
    else {
        usersModel.createUser(req.body).then(
            // On Resolve
            function (userDoc) {
                return res.status(201).json({
                    status: 201,
                    message: "Successfully created new user."
                })
            },
            // On Reject
            function (error) {
                error.code = 500
                error.reason = error.message
                error.message = "Unable to create new user."
                next(error);
            }
        )
    }
});


router.post('/verifyCredentials', jsonParser, function (req, res, next) {
    // Check the body of the incoming request is valid
    if (!req.body || !req.body.hasOwnProperty("email") || !req.body.hasOwnProperty("password")) {
        error = new Error()
        error.status = 400
        error.message = "Invalid request body, expected username and password"
        next(error)
        return
    } 

    usersModel.verifyCredentials(req.body.email, req.body.password).then(
        // Resolve
        (result) => {
            if (result.check) {
                // Get webtoken for authorised user
                res.status(200).json({
                    code: 200,
                    message: "Authorised",
                    authToken: jwt.sign(result.userDoc.toObject(), process.env.JWT_KEY, { expiresIn: "1h" })
                })
            }
            else {
                res.status(401).json({
                    code: 401,
                    message: "Unauthorised" 
                })
            }
        },
        // Reject
        error => {
            next(error)
        }
    ).catch(error => {
        next(error)
    })
});


module.exports = router