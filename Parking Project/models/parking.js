const mongoose = require('mongoose')

const parkingSchema = mongoose.Schema({
    vno:{type:String, required:true},
    vin:{type:Date, default:new Date()},
    vtype:{type:String, required:true},
    status:{type:String, default:"Parked",required:true},
    vout:Date,
    amount:Number
})

module.exports = mongoose.model('parking',parkingSchema)