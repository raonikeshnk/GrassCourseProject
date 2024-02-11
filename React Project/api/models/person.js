const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
})

mongoose.model('person', personSchema)