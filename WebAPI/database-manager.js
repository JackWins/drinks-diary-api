﻿
const mongoose = require('mongoose');


// Create database connection instance
exports.getDbConnection = () => {
    var connection = mongoose.createConnection(
        //uri = "mongodb://" + process.env.MONGODB_HOST + ":" + process.env.MONOGDB_PORT,
        uri = 'mongodb+srv://Jack:daHl6iA1tdujysdY@drinksdiarycluster-t6hop.mongodb.net/DrinksDiary?retryWrites=true',
        options = {
            dbName: process.env.MONGODB_NAME,
            useNewUrlParser: true
        }
    );
    return (connection);
};


