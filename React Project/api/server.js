const express = require('express')
const app = express()

app.use(express.json())
const apiRouter = require('./routers/apirouter')

app.use('/api', apiRouter)
app.listen(5000, () => {
  console.log('server is running on port 5000')
})
