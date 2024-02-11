const mongoose = require('mongoose')

const stSchema = mongoose.Schema({
    name:String,
    class:String,
    rollno:String,
    profile:String
})

module.exports = mongoose.model('student', stSchema)