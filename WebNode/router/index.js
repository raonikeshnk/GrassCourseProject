const router = require('express').Router()
const Reg = require('../model/reg')
const Student = require('../model/student')
const bcrypt = require('bcrypt')
const multer = require('multer')
const nodemailer = require('nodemailer')
const studentc = require('../controllers/studentcontroller')

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './public/upload')
    },
    filename:function(req, file, cb){
        cb(null,Date.now() + file.originalname)
    }
})
let upload = multer({
    storage:storage,
    limits:{fileSize:1024*1024*4}
})


router.get('/', handlelogin, studentc.studentform)
router.post('/',upload.single('profile'),studentc.studentinsert)
router.get('/about', handlelogin, studentc.studentdata)
router.get('/nikesh', handlelogin, studentc.nikesh)
router.get('/login', studentc.login)
router.post('/login', studentc.checklogin)
router.get('/signup', studentc.signup)
router.post('/signup', studentc.checksignup)
router.get('/logout', studentc.logout)
router.get('/emailsend',studentc.emailsend)

function handlelogin(req, res, next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/login')
    }
}
module.exports = router;