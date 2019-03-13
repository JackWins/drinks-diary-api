
const mongoose = require('mongoose');


var diaryEntrySchema = new mongoose.Schema(
    definition = {
        diaryID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Diary ObjectId is a mandatory field']
        },
        drinkType: {
            type: String,
            required: [true, 'Drink type is a mandatory field']
        },
        volume: {
            amount: {
                type: Number,
                min: 0.01,
                required: [true, 'An amount must be specified for a volume']
            },
            measure: {
                type: String,
                required: [true, 'A measurement unit must be specified for a volume']
            }
        },
        alcoholic: {
            type: Boolean,
            default: false
        },
        caffeinated: {
            type: Boolean,
            default: false
        }
    },
    options = {
        _id: true,
    }
);


module.exports = diaryEntrySchema;