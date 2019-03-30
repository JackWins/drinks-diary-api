
const mongoose = require('mongoose')


const VolumesSchema = new mongoose.Schema(
    definition = {
        group: String,
        key: String,
        title: String,
        millilitres: Number
    },
    options = {
        _id: true
    }
)

module.exports = VolumesSchema