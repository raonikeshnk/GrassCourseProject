const router = require('express').Router()
const personac = require('../controller/personalcontroller')

router.get('/alldata')

router.get('/singledata/:id')

router.post('/addrecord', personac.add)

router.put('/recordupdate/:id')

router.delete('/recorddelete/:id')

module.exports = router;
