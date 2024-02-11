const Reg = require('../models/reg')

exports.loginform = (req,res)=>{
    res.render('login.ejs', {message:''})
}

exports.logincheck = async(req,res)=>{
    const{us, pass} = req.body
    const record = await Reg.findOne({username:us, password:pass})
    if(record!=null){
        if(record.password==pass){
            req.session.isAuth = true
            req.session.username = us
            req.session.userid = record.id
            res.redirect('/parking')
        }else{
        res.render('login.ejs',{message:'Wrond credentials'})
        }
    }else{
        res.render('login.ejs',{message:'Wrond credentials'})
    }
}
exports.logout = (req,res)=>{
    req.session.destroy()
    res.redirect('/')
}