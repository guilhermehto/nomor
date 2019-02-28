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

const patchInvoice = (req, res) => {
  const invoiceBody = _.pick(req.body, ['description', 'amount', 'dueTo', 'paid', 'customer'])

  if (!invoiceBody.customer) {
    return saveInvoice(req.params.id, invoiceBody, res)
  }

  if (!ObjectID.isValid(invoiceBody.customer)) {
      return res.status(400).send({ error: 'Invalid customer ID' })
  }

  mongoose.model('Customer').findById(invoiceBody.customer).then(customer => {
    if (!customer) {
      return res.status(404).send({ error: 'Customer not found' })
    }

    return saveInvoice(req.params.id, invoiceBody, res)
  }, error => {
    res.status(400).send(error)
  })

}

const saveInvoice = (id, body, res) => {
  return Invoice.findOneAndUpdate(id, { $set: body }, { new: true }).then(updatedInvoice => {
    if (!updatedInvoice) {
      return res.status(404).send()
    }

    return res.send(updatedInvoice)
  }, error => {
    return res.status(400).send(error)
  })
}

router.get('/invoices', getInvoices)
router.post('/invoices', postInvoices)
router.patch('/invoices/:id', patchInvoice)

module.exports = router
