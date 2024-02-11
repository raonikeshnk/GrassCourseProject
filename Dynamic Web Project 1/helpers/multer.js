const multer = require('multer')
let storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null, './public/upload')
    },
    filename : function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
});
let upload = multer({
    storage:storage,
    limits:{fieldSize:1024*1024*4}
})
let multiple = upload.fields([{name:'img1'},{name:'img2'}])

module.exports = upload