
const mongoose = require('mongoose');


var diariesSchema = new mongoose.Schema(
    definition = {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'User ObjectId is a mandatory field']
        },
        diaryName: {
            type: String,
            required: [true, 'Diary name is a mandatory field']
        },
        duration: {
            type: Number,
            required: false
        },
        startDate: {
            type: Date,
            default: new Date()
        },
        endDate: {
            type: Date,
            required: false
        },
        totalEntries: {
            type: Number,
            default: 0
        },
        lastEntry: {
            type: Date,
            required: false,
        }
    },
    options = {
        _id: true,
    }
);


module.exports = diariesSchema;