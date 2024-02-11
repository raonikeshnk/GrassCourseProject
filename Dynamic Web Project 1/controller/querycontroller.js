const Query = require('../model/query')
const nodemailer = require('nodemailer')



exports.queryadd = (req,res)=>{
    try{
    const{email,query}=req.body
    const record = new Query({email:email,query:query})       
    record.save()
    }catch(err){
        console.log(err.message)
    }
}
exports.querypage = async(req,res)=>{
    const loginname = req.session.loginname
    const record = await Query.find().sort({status:1})
    res.render('admin/query.ejs',{loginname, record})
}
exports.emailpage = async(req,res)=>{
    const id = req.params.id
    const loginname = req.session.loginname
    const record = await Query.findById(id)
    res.render('admin/emailform.ejs',{loginname, record})
}
exports.sendmail = async(req,res)=>{
    const id = req.params.id
    const path = req.file.path
    const {emailto,emailfrom,subject,body} = req.body
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'indiancoding.alwar@gmail.com',
          pass: 'xnmhjksdchpxzudu'
        }
      });
      console.log('connected to gmail SMPT Method')
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: emailfrom, // sender address
          to:emailto,  // list of receivers
          subject: subject, // Subject line
          text: body, // plain text body
        //   html: "<b>Hello world?</b>", // html body
        attachments:[{
            path:path
        }]
        });
        console.log('email sent')
        await Query.findByIdAndUpdate(id,{status:'Replied'})
        res.redirect('/admin/query')


}