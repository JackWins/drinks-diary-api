
const mongoose = require('mongoose');
const ValidationException = require('../../exceptions/validation-exception')


var diariesSchema = new mongoose.Schema(
    definition = {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'User ObjectId is a mandatory field']
        },
        diaryName: {
            type: mongoose.Schema.Types.String,
            required: [true, 'Diary name is a mandatory field'],
            match: [/^([a-zA-Z1-9\_\-\s]*)$/g, 'Diary name contains invalid characters.']
        },
        duration: {
            type: mongoose.Schema.Types.Number,
            min: [1, "Minimum duration is 1 day."],
            required: false
        },
        startDate: {
            type: mongoose.Schema.Types.Date,
            default: Date.now,
            validate: {
                validator: (value) => {
                    const currentDate = new Date().setHours(0, 0, 0, 0)
                    return (value >= new Date(currentDate))
                },
                message: "Start date cannot occur before the current date."
            }
        },
        endDate: {
            type: mongoose.Schema.Types.Date,
            required: false,
            validate: {
                validator: (value) => {
                    const currentDate = new Date().setHours(0, 0, 0, 0)
                    return (value > new Date(currentDate))
                },
                message: "End date cannot occur before the current date."
            }
        },
        lastEntry: {
            type: mongoose.Schema.Types.Date,
            required: false,
        }
    },
    options = {
        _id: true,
    }
);


module.exports = diariesSchema;