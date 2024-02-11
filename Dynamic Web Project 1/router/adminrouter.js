const router = require('express').Router()
const regc = require('../controller/regcontroller')
const bannerc = require('../controller/bannercontroller')
const servicec = require('../controller/servicecontroller')
const testic = require('../controller/testicontroller')
const queryc = require('../controller/querycontroller')
const addc = require('../controller/addcontroller')
const upload = require('../helpers/multer')



router.get('/', regc.loginpage)
router.post('/', regc.logincheck)
router.get('/dashboard',loginhandle,regc.dashboard)
router.get('/logout', regc.logout)
router.get('/banner',loginhandle,bannerc.bannerpage)
router.get('/bannerupdateform/:id', loginhandle,bannerc.bannerupdateform)
router.post('/bannerupdateform/:id',upload.single('img'), bannerc.bannerupdate)
router.get('/service', loginhandle,servicec.servicepage)
router.get('/serviceadd',loginhandle, servicec.serviceform)
router.post('/serviceadd',upload.single('img'), servicec.serviceadd )
router.get('/servicedelete/:id',loginhandle, servicec.servicedelete)
router.post('/service',servicec.search)
router.get('/servicestatusupdate/:id',loginhandle,servicec.servicestatusupdate)
router.get('/testi',loginhandle,testic.testipage)
router.get('/testistatusupdate/:id',loginhandle,testic.testistatusupdate)
router.get('/testidelete/:id',loginhandle, testic.testidelete)
router.get('/query',loginhandle, queryc.querypage)
router.get('/reply/:id',loginhandle,queryc.emailpage)
router.post('/reply/:id',upload.single('attachment'), queryc.sendmail)
router.get('/address',loginhandle,addc.addpage)
router.get('/addupdate/:id',loginhandle, addc.updateform)
router.post('/addupdate/:id',  addc.addupdate)



function loginhandle(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/admin/')
    }
}


module.exports = router