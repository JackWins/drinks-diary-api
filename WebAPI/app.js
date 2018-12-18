// https://github.com/focusaurus/express_code_structure

// npm Imports
var express = require('express');
var debug = require('debug');

// Local Imports
var config = require('./config');
var logging = require('./logging');

var app = express();

app.get('/', (req, res) => res.send('Hello World!'))

logging.log_info('Starting Drinks Diary API Server...')
app.listen(config.express.port, config.express.ip, function (error) {
    if (error) {
        logging.log_error('Unable to listen for connections: ' + error)
        process.exit(10)
    }
    logging.log_info('express is listening on http://' +
        config.express.ip + ':' + config.express.port)
})

// Export for testing
module.exports = app
