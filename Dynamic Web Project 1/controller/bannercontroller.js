const Banner = require('../model/banner')

exports.bannerpage = async (req, res) => {
    try {
        const loginname = req.session.loginname;
        const record = await Banner.findOne();
        res.render('admin/banner.ejs', { loginname, record })
    } catch (err) {
        console.log(err.message);
    }
}
exports.bannerupdateform = async (req, res) => {
    try {
        const id = req.params.id;
        const loginname = req.session.loginname;
        const record = await Banner.findById(id);
        res.render('admin/bannerupdateform.ejs', { message: '', loginname, record })
    } catch (err) {
        console.log(err.message);
    }
}
exports.bannerupdate = async (req, res) => {
    const { title, desc, mdetails } = req.body
    const loginname = req.session.loginname;
    const id = req.params.id;
    const record = await Banner.findById(id);

    try {
        if (req.file) {
            const filename = req.file.filename
            await Banner.findByIdAndUpdate(id, { title: title, desc: desc, mdetails: mdetails, img: filename })
        } else {
            await Banner.findByIdAndUpdate(id, { title: title, desc: desc, mdetails: mdetails })
        }
        res.render('admin/bannerupdateform.ejs', { message: 'successfully banner details update', loginname, record })
    } catch (err) {
        console.log(err.message);
    }
}

exports.userbannerpage = async(req,res)=>{
    const record = await Banner.findOne()
    res.render('banner.ejs', {record})
}