const Receiver = require('./Receiver')
const router = require('express').Router()

const getReceivers = (req, res) => {
  Receiver.find().then(receivers => {
    res.send({ receivers })
  }, error => {
    res.status(400).send(error)
  })
}

router.get('/receivers', getReceivers)

module.exports = router