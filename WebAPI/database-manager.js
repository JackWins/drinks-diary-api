
const mongoose = require('mongoose');
const logger = require('./winston-logger');
require('dotenv').config({ path: `${__dirname}/.env` })

exports.getDbConnection = () => {
    if (parseInt(process.env.MONGODB_LOCAL) === 0) {
        // Connect to Mongo Atlas instance
        const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@drinksdiary-t6hop.mongodb.net/test?retryWrites=true&w=majority`
        const connection = mongoose.createConnection(uri, options = { useNewUrlParser: true, dbName: process.env.MONGODB_NAME });
        connection.on('error', (error) => { logger.error(error.message) })
        return connection;
    }
    else {
        // Connect to local Mongo instance
        const uri = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONOGDB_PORT}`
        const connection = mongoose.createConnection(uri, options = { useNewUrlParser: true, dbName: process.env.MONGODB_NAME });
        connection.on('error', (error) => { logger.error(error.message) })
        return connection;
    }
};