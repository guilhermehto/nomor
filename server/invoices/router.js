const router = require('express').Router()
const mongoose = require('mongoose')
const { ObjectID } = require('mongodb')
const Invoice = require('./invoice')
const _ = require('lodash')

const getInvoices = (req, res) => {
  Invoice.find().then(invoices => {
    res.send({ invoices })
  }, error => {
    res.status(400).send(error)
  })
}

const postInvoices = (req, res) => {
  const invoiceBody = _.pick(req.body, ['description', 'amount', 'dueTo', 'paid', 'customer'])

  if (!ObjectID.isValid(invoiceBody.customer)) {
    return res.status(400).send({ error: 'Invalid customer ID' })
  }

  mongoose.model('Customer').findById(invoiceBody.customer).then(customer => {
    if (!customer) {
      return res.status(404).send({ error: 'Customer not found' })
    }

    const invoice = new Invoice(invoiceBody)
    invoice.save().then(doc => {
      res.send(doc)
    }, error => {
      return res.status(400).send(error)
    })

  }, error => {
    res.status(400).send(error)
  })
}

router.get('/invoices', getInvoices)
router.post('/invoices', postInvoices)

module.exports = router
