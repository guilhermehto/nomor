const Customer = require('./customer')
const router = require('express').Router()
const _ = require('lodash')

const getCustomers = (req, res) => {
  Customer.find().then(customers => {
    res.send({ customers })
  }, error => {
    res.status(400).send(error)
  })
}

const postCustomers = (req, res) => {
  const customerBody = _.pick(req.body, ['name', 'email'])
  const customer = new Customer(customerBody)
  customer.save().then(doc => {
    res.send(doc)
  }, error => {
    res.status(400).send(error)
  })
}

router.get('/customers', getCustomers)
router.post('/customers', postCustomers)

module.exports = router