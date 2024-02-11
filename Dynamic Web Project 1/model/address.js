const mongoose = require('mongoose')

const addSchema = mongoose.Schema({
    add:String,
    mobile:Number,
    tel:Number,
    email:String,
    insta:String,
    fb:String,
    snap:String,
    wapp:String

})


module.exports = mongoose.model('add', addSchema)



