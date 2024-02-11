const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
    title:String,
    img:String,
    desc:String,
    mdetails:String,
    postedDate:String,
    status:{type:String,default:'Unpublished'}
})

module.exports = mongoose.model('service',serviceSchema )