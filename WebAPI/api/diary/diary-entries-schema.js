
const mongoose = require('mongoose');


var diaryEntrySchema = new mongoose.Schema(
    definition = {
        diaryID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Diary ObjectId is a mandatory field']
        },
        drinkName: {
            type: String,
            required: [true, 'Drink Name is a mandatory field']
        },
        brand: {
            type: String,
            required: false
        },
        volume: {
            amount: {
                type: Number,
                min: 1,
                required: [true, 'Amount is a mandatory field for Volume']
            },
            measure: {
                type: String,
                required: [true, 'Measurement is a mandatory field for Volume']
            }
        },
        containsAlcohol: {
            type: Boolean,
            required: [true, "Alcohol status is a mandatory field"]
        },
        alcoholPercentage: {
            type: Number,
            required: false,
            default: 0
        },
        containsCaffeine: {
            type: Boolean,
            required: [true, "Caffeine status is a mandatory field"]
        },
        caffeineContent: {
            type: Number,
            required: false,
            default: 0
        },
        date: {
            type: mongoose.Schema.Types.Date,
            default: Date.now
        }
    },
    options = {
        _id: true,
    }
);


module.exports = diaryEntrySchema;