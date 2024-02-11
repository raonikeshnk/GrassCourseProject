const router = require('express').Router()
const regc = require('../controllers/regcontroller')
const parkingc = require('../controllers/parkingcontroller')
const handlelogin = require('../helper/handlelogin')


router.get('/', regc.loginform)
router.post('/', regc.logincheck)
router.get('/logout', regc.logout)

router.get('/parking',handlelogin, parkingc.parkingselection)
router.get('/add',parkingc.addform)
router.post('/add',parkingc.add)
router.get('/out', parkingc.out)
router.get('/parkingupdate/:id', parkingc.calculation)
router.get('/print/:id', parkingc.print)

module.exports = router