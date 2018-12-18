/*
 * logging.js contains the initialisation and configuration of the logger object 
 * from the winston library. Functions for interacting with the logger object 
 * are defined here and exposed for usage by other modules importing this module.
 */

// npm imports
var winston = require('winston')


// Define system logging levels
const logging_levels = {
    levels: {
        error: 0,
        info: 1,
    }
}

// Define log message format
const myFormat = winston.format.printf(info => {
    return info.level.toUpperCase() + `: ${info.timestamp}: ${info.message}`;
});

// Create Winston logger object
const logger = winston.createLogger({
    levels: logging_levels.levels,
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: '_logs/info_log.log', level: 'info' }),
        new winston.transports.File({ filename: '_logs/error_log.log', level: 'error' })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        myFormat
    )
}); 

/**
 * Log an info message to the console and info log file
 * @param {string} log_message - represents the message being logged
 */
function log_info(log_message) { logger.log('info', log_message); }

/**
 * Log an error message to the console and info and error log files
 * @param {string} log_message - represents the message being logged
 */
function log_error(log_message) { logger.log('error', log_message); }


exports.log_info = log_info
exports.log_error = log_error
