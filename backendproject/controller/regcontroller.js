const Reg = require('../model/reg')


exports.loginpage = (req, res)=>{
    res.render('admin/login.ejs',{message:''})
}

exports.logincheck = async(req, res)=>{
    const{us, pass}=req.body
    try{
    const record = await Reg.findOne({username:us})
    if(record!==null){
        if(record.password==pass){
            req.session.isAuth = true;
            req.session.loginname = us
            res.redirect('/admin/dashboard')
            console.log('login success')
        }else{
        res.render('admin/login.ejs', {message:'wrong credentials'})
        }
    }else{
        res.render('admin/login.ejs', {message:'wrong credentials'})
    }
    }catch(error){
        console.log(error.message)
    }
}

exports.dashboard = (req,res)=>{
    const loginname = req.session.loginname
    res.render('admin/dashboard.ejs', {loginname})
}
exports.logout = (req,res)=>{
    req.session.destroy();
    res.redirect('/admin/')
}