const Reg = require('../model/reg')

exports.loginpage = (req, res) => {
    res.render('admin/login.ejs', { message: '' })
}

exports.logincheck = async (req, res) => {
    const { us, pass } = req.body;
    try {
        const record = await Reg.findOne({ username: us })
        if (record !== null) {
            if (record.password == pass) {
                req.session.isAuth = true
                req.session.loginname = us
                res.redirect('/admin/dashboard')
            } else {
                res.render('admin/login.ejs', { message: 'Wrong Credentials' })
            }
        } else {
            res.render('admin/login.ejs', { message: 'Wrong Credentials' })
        }
    } catch (err) {
        console.log("Error in Login", err.message)
    }
}

exports.dashboard = (req, res) => {
    try {
        const loginname = req.session.loginname
        res.render('admin/dashboard.ejs', { loginname })
    } catch (err) {
        console.log(err.message);
    }
}

exports.logout = (req, res) => {
    try {
        req.session.destroy()
        res.redirect('/admin/')
    } catch (err) {
        console.log(err.message);
    }
}