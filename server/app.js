const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3300
const router = require('./router/index')

dotenv
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', router)
app.use('/api/public/assets', express.static('public/assets'))

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

module.exports = app