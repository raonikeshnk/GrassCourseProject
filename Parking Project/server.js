const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.urlencoded({extended:false}))
const parkingrouter = require('./routers/parkingrouter')
const session = require('express-session')
const mongoose = require('mongoose')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)


app.use(session({
    secret:process.env.KEY,
    resave:false,
    saveUninitialized:false
}))
app.use(parkingrouter)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.listen(process.env.PORT,()=>{console.log(`Server is running on port ${process.env.PORT} `)} )