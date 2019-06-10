
const mongoose = require('mongoose');
const logger = require('./winston-logger');

exports.getDbConnection = () => {
    // Create database connection instance
    const connection = mongoose.createConnection(
        uri = "mongodb://" + process.env.MONGODB_HOST + ":" + process.env.MONOGDB_PORT,
        options = { dbName: process.env.MONGODB_NAME, useNewUrlParser: true }
    );

    // Raise error if issue connecting to the Mongo instance
    connection.on('error', (error) => { logger.error(error.message) })
    return connection;
};


