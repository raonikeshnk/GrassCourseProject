const Student = require('../model/student')
const Reg = require('../model/reg')
const bcrypt = require('bcrypt')


exports.studentform = (req, res) => {
    const loginname = req.session.loginname
    res.render('home.ejs',{loginname})
}

exports.studentinsert = (req,res)=>{
    const filename = req.file.filename
    const {sname, sclass, rollno, profile} = req.body  
    const record = Student({name:sname,class:sclass,rollno:rollno, profile:filename})
    record.save()
}

exports.studentdata = async(req, res) => {
    const loginname = req.session.loginname
    const record = await Student.find()    
    // console.log(record)
    console.log(toString(Date.now()))
    res.render('about.ejs',{record, loginname})
}
exports.nikesh = (req, res) => {
    // res.send("Hello World") 
    const loginname = req.session.loginname
    res.render('nikesh.ejs',{loginname})
}
exports.login = (req, res) => {
    // res.send("Hello World") 
    const loginname = req.session.loginname
    res.render('login.ejs',{loginname})
}

exports.checklogin = async (req, res) => {
    const { us, pass } = req.body
    const record = await Reg.findOne({username:us})
    if(record!==null){
    const comparepass = bcrypt.compare(pass, record.password)
    if(comparepass){
// console.log(req.session)
        req.session.isAuth = true
        req.session.loginname = us
    res.redirect('/')
    }else{
        console.log(`${us}'s Password is incorrect! Please try again with correct credentials`);
    }
    }else{
        console.log(`Username '${us}' not found`)
    }
}

exports.signup = (req, res) => {
    // res.send("Hello World") 
    const loginname = req.session.loginname
    res.render('signup.ejs',{loginname})
}

exports.checksignup = async (req, res) => {
    const { us, pass } = req.body
    const username = await Reg.findOne({username:us})
if(username==null){
    const convertpass = await bcrypt.hash(pass, 10)
    const record = Reg({username:us, password:convertpass})
    record.save()
    res.redirect('/login')
    }else{
        res.send('username already exists in database!')
    }
}
exports.logout = (req,res)=>{
    req.session.destroy()
    res.redirect('/login')
}

exports.emailsend = async(req,res)=>{
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'indiancoding.alwar@gmail.com',
          pass: 'xnmhjksdchpxzudu'
        },
      });
    console.log('connected to gmail SMTP')
      
        const info = await transporter.sendMail({
          from: 'indiancoding.alwar@gmail.com', // sender address
          to: "raonky222@gmail.com", // list of receivers
          subject: "Test NodeMailer", // Subject line
          text: "Hello first email from node mailer", // plain text body
          html: "<a href='https://www.google.com'>Google Page</a>", // html body
          attachments:[{
            path:'./public/upload/1689070351325nikesh.jpg'
          }]
        });
    console.log('email send')
}