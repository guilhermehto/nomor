const Customer = require('./customer')
const router = require('express').Router()

const getCustomers = (req, res) => {
  Customer.find().then(customers => {
    res.send({ customers })
  }, error => {
    res.status(400).send(error)
  })
}

router.get('/customers', getCustomers)

module.exports = router