const express = require('express')
const app = express()
app.use(express.urlencoded({extended:false}))
const index = require('./router/index')
const mongoose = require('mongoose')
const session = require('express-session')
mongoose.connect('mongodb://localhost:27017/nikesh')



app.use(session({
    secret:'secretkey',
    resave : false,
    saveUninitialized : false
}))

app.use(index)
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.listen(5000)