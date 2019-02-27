const Bill = require('./bill')
const router = require('express').Router()

const getBills = (req, res) => {
  Bill.find().then(bills => {
    res.send({ bills })
  }, error => {
    res.status(400).send(error)
  })
}

router.get('/bills', getBills)

module.exports = router