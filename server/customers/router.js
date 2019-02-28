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

const postCustomer = (req, res) => {
  const customerBody = _.pick(req.body, ['name', 'email'])
  const customer = new Customer(customerBody)
  customer.save().then(doc => {
    res.send(doc)
  }, error => {
    res.status(400).send(error)
  })
}

const patchCustomer = (req, res) => {
  const customerBody = _.pick(req.body, ['name', 'email'])
  Customer.findByIdAndUpdate(req.params.id, { $set: customerBody }, {new: true}).then(customer => {
    if (!customer) {
      return res.status(404).send()
    }

    return res.send({customer})
  }).catch(error => {
    res.status(400).send(error)
  })
}

router.get('/customers', getCustomers)
router.post('/customers', postCustomer)
router.patch('/customers/:id', patchCustomer)

module.exports = router
