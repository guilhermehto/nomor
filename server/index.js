const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('./db/mongoose')
const customersRouter = require('./customers/router')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.use('', require('./customers/router'))

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`)
})

module.exports = app
