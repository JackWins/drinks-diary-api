
const winston = require('winston');
const fs = require('fs')

class WinstonLogger {

    constructor() {
        // Check if log directory exists, 
        // create directory if it doesn't exist.
        this.logDir = `${__dirname}/logs`
        if (!fs.existsSync(this.logDir)) { fs.mkdirSync(this.logDir) }

        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    timestamp: true,
                    level: 'info'
                }),
                new winston.transports.File({
                    filename: `${this.logDir}/combined.log`,
                    timestamp: true,
                    level: 'info'
                }),
                new winston.transports.File({
                    filename: `${this.logDir}/error.log`,
                    timestamp: true,
                    level: 'error'
                })
            ]
        })

        this.logger.stream = {
            write: function (message, encoding) {
                logger.info(message)
            }
        }
    }
    

    info(logMessage) {
        this.logger.log('info', logMessage);
    };

    error(logMessage) {
        this.logger.log('error', logMessage);
    };
};

module.exports = new WinstonLogger()