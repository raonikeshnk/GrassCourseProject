const mongoose = require('mongoose')

const stSchema = mongoose.Schema({
    username:String,
    password:String
})

module.exports = mongoose.model('reg', stSchema)