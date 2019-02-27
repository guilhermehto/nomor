const { Receiver } = require('./Receiver')
const router = require('express').Router()
const _ = require('lodash')

const getReceivers = (req, res) => {
  Receiver.find().then(receivers => {
    res.send({ receivers })
  }, error => {
    res.status(400).send(error)
  })
}

const postReceiver = (req, res) => {
  const receiverBody = _.pick(req.body, ['name', 'email'])
  const receiver = new Receiver(receiverBody)
  receiver.save().then(newReceiver => {
    res.send(newReceiver)
  }, error => {
    res.status(400).send(error)
  })
}

const patchReceiver = (req, res) => {
  const receiverBody = _.pick(req.body, ['name', 'email'])
  Receiver.findByIdAndUpdate(req.params.id, { $set: receiverBody }, { new: true })
    .then(updatedReceiver => {
      if (!updatedReceiver) {
        res.status(404).send()
      }

      res.send(updatedReceiver)
    }, error => {
      res.status(400).send(error)
    })
}

router.get('/receivers', getReceivers)
router.post('/receivers', postReceiver)
router.patch('/receivers/:id', patchReceiver)

module.exports = router
