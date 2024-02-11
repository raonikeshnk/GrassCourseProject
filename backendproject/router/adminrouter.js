const router = require('express').Router()
const regc = require('../controller/regcontroller')
const bannerc = require('../controller/bannercontroller')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './public/upload')
    },
    filename:function(req, file, cb){
        cb(null, Date.now()+file.originalname)
    }
})
let upload = multer({
    storage:storage,
    limits:{fileSize:1024*1024*4}
})



function handlelogin(req, res, next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/admin')
    }
}

router.get('/', regc.loginpage)
router.post('/',regc.logincheck)
router.get('/dashboard',handlelogin, regc.dashboard)
router.get('/logout',regc.logout)

router.get('/banner', bannerc.bannerpage)
router.get('/bannerupdateform/:id', bannerc.bannerform)
router.post('/bannerupdateform/:id', upload.single('img'),bannerc.bannerupdate )




module.exports = router