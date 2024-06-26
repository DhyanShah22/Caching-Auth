const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
    Subject: {
        type: String,
        required: true
    },
    Faculty: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Course', courseSchema)