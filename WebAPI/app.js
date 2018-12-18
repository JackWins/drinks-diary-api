// https://github.com/focusaurus/express_code_structure

'use strict';
var express = require('express');
var config = require('./config');

var app = express();


log.info('Starting Drinks Diary API Server...')
app.listen(config.express.port, config.express.ip, function (error) {
    if (error) {
        log.error('Unable to listen for connections', error)
        process.exit(10)
    }
    log.info('express is listening on http://' +
        config.express.ip + ':' + config.express.port)
})

// Export for testing
module.exports = app
