const Banner = require('../model/banner')

exports.bannerpage = async(req,res)=>{
    try{
    const loginname = req.session.loginname
    const record = await Banner.findOne()
    res.render('admin/banner.ejs',{loginname, record})
    }catch(err){
        console.log(err.message)
    }
}

exports.bannerform = async(req,res)=>{
try{
const id = req.params.id
const record = await Banner.findById(id)
const loginname = req.session.loginname
res.render('admin/bannerform.ejs', {loginname, record, message:''})
}catch(err){
    console.log(err.message)
}
}

exports.bannerupdate = async(req,res)=>{
    const {title, desc} = req.body
    const id = req.params.id
    const loginname = req.session.loginname
    const record = await Banner.findById(id)

    try{
    if (req.file) {
        const filename = req.file.filename;
        await Banner.findByIdAndUpdate(id, { title: title, desc: desc, img: filename });
      } else {
        await Banner.findByIdAndUpdate(id, { title: title, desc: desc });
      }


    res.render('admin/bannerform.ejs',{message:"Successfully Banner Detail Update", loginname, record})
    }catch(err){
    console.log(err.message)
    }
}