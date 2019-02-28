const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('./db/mongoose')

const customersRouter = require('./customers/router')
const receiversRouter = require('./receiver/router')
const billsRouter = require('./bills/router')
const invoicesRouter = require('./invoices/router')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.use('', customersRouter)
app.use('', receiversRouter)
app.use('', billsRouter)
app.use('', invoicesRouter)


app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`)
})

module.exports = app
