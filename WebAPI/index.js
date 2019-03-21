
const express = require('express');
const morgan = require('morgan');
const winston = require('./winston-logger');


// Initialise Express application instance
var app = express()


// Enable HTTP request logging with morgan, stream output to the winston logger
var winstonLogger = new winston()
app.use(morgan('combined', { stream: winstonLogger.logger.stream }))


// Middleware to apply CORS headers for /api routes
app.use("/api", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === "OPTIONS") {
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELTE'
        );
        return res.status(200).json({})
    }
    next();
});


// Bind /api route handlers to the express application
app.use("/api/users", require('./api/users/router'))
app.use("/api/diary", require('./api/diary/router'))


// Handle undefined route attempts
app.use("*", (req, res, next) => {
    var error = new Error("not found")
    error.status = 404
    next(error)
})

// Custom exception handlers
const ValidationExceptionHandler = require('./api/error-handlers/validation-error-handler');
const MissingBodyHandler = require('./api/error-handlers/missing-body-error-handler');
const PermissionHandler = require('./api/error-handlers/permission-error-handler');
const AuthFailedHandler = require('./api/error-handlers/auth-error-handler');
app.use([ValidationExceptionHandler, MissingBodyHandler, AuthFailedHandler, PermissionHandler])

// TODO: log occuring exception

// Define handler for generating error response to client
app.use(function (error, req, res, next) {
    var errorCode = error.status || 500
    res.status(errorCode);
    res.json({
        error: {
            code: errorCode,
            message: "Internal server error"
        }
    })
    throw error
});


// Load error handlers for experess application
//app.use(require('./api/error-handlers/404-not-found'))


module.exports = app
