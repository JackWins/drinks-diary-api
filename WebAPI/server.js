// https://github.com/focusaurus/express_code_structure

var config = require('./config');
var app = require('./index');

// Configure logger instance
var winston = require('./winston-logger');
var logger = new winston();


// Start the server
logger.info("Starting Drinks Diary API server...");
app.listen(config.express.port, config.express.ip, function (error) {
    if (error) {
        logger.error('Error starting server:' + error.message);
        process.exit(10);
    }

    logger.info("Successfully started server on: " + config.express.ip + ":" + config.express.port);
})
