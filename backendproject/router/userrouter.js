const router = require('express').Router()
const bannerc = require('../controller/bannercontroller')
const Banner = require('../model/banner')

router.get('/', async(req, res)=>{
    const bannerRecord = await Banner.findOne()
    res.render('index.ejs', {bannerRecord})
})

module.exports = router