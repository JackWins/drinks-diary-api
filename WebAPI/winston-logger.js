
const appRoot = require('app-root-path');
const winston = require('winston');


class WinstonLogger {

    constructor(component='global') {
        var config = {
            file: {
                level: 'info',
                filename: `${appRoot}/logs/${component}/${component}.log`,
                handleExceptions: true,
                json: true,
                maxsize: 5242880, // 5MB
                maxFiles: 5,
                colorize: false,
            },
            console: {
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true,
            }
        };

        // Create a logger instance
        var logger = winston.createLogger({
            transports: [
                new winston.transports.File(config.file),
                new winston.transports.Console(config.console)
            ],
            exitOnError: false
        });

        // Create a stream object with a 'write' function that will be used by `morgan`
        logger.stream = {
            write: function (message, encoding) {
                logger.log('info', message);
            },
        };

        // Bind logger instance to the class instance
        this.logger = logger;
    };

    info(logMessage) {
        this.logger.log('info', logMessage);
    };

    error(logMessage) {
        this.logger.log('info', logMessage);
    };

};

module.exports = WinstonLogger