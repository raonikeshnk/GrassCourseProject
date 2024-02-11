const express = require('express');
const app = express()
require('dotenv').config();
const adminRouter = require('./router/adminrouter')
const userRouter = require('./router/userrouter')
app.use(express.urlencoded({extended:false}))
const mongoose = require('mongoose')
const session = require('express-session')
mongoose.connect(`${process.env.DB_NAME}/${process.env.DB_URL}`)


app.use(session({
    secret: process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    cookie: {maxAge:1000*60*60}
}))

app.use('/admin',adminRouter)
app.use(userRouter)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.listen(process.env.PORT, ()=>{console.log(`Server is running on port ${process.env.PORT}`)})