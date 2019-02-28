const router = require('express').Router()
const Invoice = require('./invoice')

const getInvoices = (req, res) => {
  Invoice.find().then(invoices => {
    res.send({ invoices })
  }, error => {
    res.status(400).send(error)
  })
}

router.get('/invoices', getInvoices)

module.exports = router
