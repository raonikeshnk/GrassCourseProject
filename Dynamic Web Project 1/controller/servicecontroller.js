const Service = require('../model/service')

exports.servicepage = async (req, res) => {
    const loginname = req.session.loginname;
    const record = await Service.find().sort({ postedDate: -1 })
    const tservice = await Service.count()
    const tpublished = await Service.count({ status: 'Published' })
    const tunpublished = await Service.count({ status: 'Unpublished' })
    res.render('admin/service.ejs', { loginname, record, tpublished, tunpublished, tservice })
}
exports.serviceform = (req, res) => {
    const loginname = req.session.loginname;
    res.render('admin/serviceform.ejs', { loginname })
}
exports.serviceadd = async (req, res) => {
    const currentDate = new Date();
    const { sname, sdesc, smd } = req.body;
    const filename = req.file.filename
    const formattedDate = 
        `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}
        ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    console.log(formattedDate)
    const record = await new Service({ title: sname, desc: sdesc, mdetails: smd, img: filename, postedDate: formattedDate })
    record.save()
    res.redirect('/admin/service',);
}
exports.servicedelete = async (req, res) => {
    const id = req.params.id;
    await Service.findByIdAndDelete(id);
    res.redirect('/admin/service')
}

exports.servicestatusupdate = async (req, res) => {
    const id = req.params.id
    const record = await Service.findById(id)
    let newstatus = null
    if (record.status === 'Unpublished') {
        newstatus = 'Published'
    } else {
        newstatus = 'Unpublished'
    }
    await Service.findByIdAndUpdate(id, { status: newstatus })
    res.redirect('/admin/service')
}

exports.search = async(req,res)=>{
    const loginname = req.session.loginname;
    const {search} = req.body
    const record = await Service.find({status:search})
    const tservice = await Service.count()
    const tpublished = await Service.count({ status: 'Published' })
    const tunpublished = await Service.count({ status: 'Unpublished' })
    res.render('admin/service.ejs', { loginname, record, tpublished, tunpublished, tservice })
}

exports.moredetails = async(req,res)=>{
    const id = req.params.id
    const record=await Service.findById(id)
    res.render('servicedetails.ejs',{record})
}





