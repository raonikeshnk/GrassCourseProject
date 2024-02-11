const Parking = require('../models/parking')


exports.parkingselection = async (req, res) => {
    const record = await Parking.find()
    res.render('parking.ejs', { username: req.session.username, record })
}

exports.addform = (req, res) => {
    res.render('addform.ejs', { username: req.session.username, message: '' })
}
exports.add = (req, res) => {
    const { vno, vtype } = req.body
    const record = new Parking({ vno: vno, vtype: vtype })
    record.save()
    res.render('addform.ejs', { username: req.session.username, message: 'Successfully Record Added' })
}
exports.out = async (req, res) => {
    const record = await Parking.find()
    res.render('parkingout.ejs', { username: req.session.username, record })
}
exports.calculation = async (req, res) => {
    const id = req.params.id
    const vout = new Date()
    const record = await Parking.findById(id)
    const totalTimeSpend = (vout - record.vin) / (1000 * 60 * 60)
    let amount = null
    if (record.vtype == '2w') {
        amount = totalTimeSpend * 30
    } else if(record.vtype == '3w'){
        amount = totalTimeSpend * 40
    } else if(record.vtype == '4w'){
        amount = totalTimeSpend * 80
    } else if(record.vtype == 'lv'){
        amount = totalTimeSpend * 100
    } else if(record.vtype == 'hv'){
        amount = totalTimeSpend * 150
    } else if(record.vtype == 'others'){
        amount = totalTimeSpend * 50
    }else {
        amount = totalTimeSpend * 70
    }
    if(amount<30){
        amount = 30
    }

    await Parking.findByIdAndUpdate(id,{vout:vout, amount:Math.round(amount), status:"Out"})
    // res.redirect('/out')
}

exports.print = async(req,res)=>{
    const record = await Parking.findById(req.params.id)
    const totalTimeSpend = (record.vout - record.vin)
    res.render('printformat.ejs', {record, totalTimeSpend})
}