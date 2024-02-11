const router = require('express').Router()
const bannerc = require('../controller/bannercontroller')
const servicec = require('../controller/servicecontroller')
const testic = require('../controller/testicontroller')
const queryc = require('../controller/querycontroller')
const addc = require('../controller/addcontroller')
const Banner = require('../model/banner')
const Service = require('../model/service')
const Testi = require('../model/testi')
const Address = require('../model/address')
const upload = require('../helpers/multer')



router.get('/', async(req,res)=>{
    const bannerRecord = await Banner.findOne()
    const serviceRecord = await Service.find({status:'Published'})
    const testiRecord = await Testi.find({status:'Published'}).sort({postedDate:-1})
    const addRecord = await Address.findOne()
    res.render('index.ejs',{bannerRecord,serviceRecord,testiRecord, addRecord})
})

router.get('/banner',bannerc.userbannerpage)
router.get('/testiadd', testic.testiform)
router.post('/testiadd', upload.single('img'), testic.testiadd)
router.post('/',queryc.queryadd)
router.get('/servicedetails/:id',servicec.moredetails)

module.exports = router