const Address = require('../model/address')

exports.addpage = async(req,res)=>{
    const loginname = req.session.loginname
    const record = await Address.findOne()
    res.render('admin/addpage.ejs',{loginname,record})
}
exports.updateform = async(req,res)=>{
    const loginname = req.session.loginname
    const record = await Address.findById(req.params.id)
    res.render('admin/addform.ejs',{loginname, record})
}
exports.addupdate = async(req,res)=>{
    const{add, mobile,tel, email,insta, fb, snap, wapp} = req.body
    const id = req.params.id
    await Address.findByIdAndUpdate(id,{add:add,mobile:mobile,tel:tel,email:email,insta:insta,fb:fb,snap:snap,wapp:wapp})
    res.redirect('/admin/address')
}