function loginhandle(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/admin/')
    }
}
module.exports = loginhandle()