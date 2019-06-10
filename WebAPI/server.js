
// Local Imports
const app = require('./index');
const config = require('./config');
const logger = require('./winston-logger');


// Start the server
logger.info("Starting Drinks Diary API server...");
app.listen(config.express.port, config.express.ip, function (error) {
    if (error) {
        logger.error('Error starting server:' + error.message);
    } else {
        logger.info("Successfully started server on: " + config.express.ip + ":" + config.express.port);
    }
})
