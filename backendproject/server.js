const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.urlencoded({extended:false}))
const userRouter = require('./router/userrouter')
const adminRouter = require('./router/adminrouter')
const mongoose = require('mongoose')
const session = require('express-session')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)


app.use(session({
    secret:process.env.KEY,
    resave:false,
    saveUninitialized:false
}))
app.use(userRouter)
app.use('/admin',adminRouter)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.listen(process.env.PORT, ()=>{console.log(`server is running on port ${process.env.PORT}`)})