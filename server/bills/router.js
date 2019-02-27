const Bill = require('./bill')
const { ObjectID } = require('mongodb')
const mongoose = require('mongoose')
const router = require('express').Router()
const _ = require('lodash')

const getBills = (req, res) => {
  Bill.find().populate('receiver').then(bills => {
    res.send({ bills })
  }, error => {
    res.status(400).send(error)
  })
}

const postBill = (req, res) => {
  const billBody = _.pick(req.body, ['description', 'amount', 'dueTo', 'receiver'])
  
  if (!ObjectID.isValid(billBody.receiver)) {
    return res.status(400).send({ error: 'Invalid receiver ID' })
  }

  mongoose.model('Receiver').findById(billBody.receiver).then(receiver => {
    if (!receiver) {
      return res.status(404).send({ error: 'Receiver not found'})
    }

    const bill = new Bill(billBody)

    bill.save().then(doc => {
      res.send(doc)
    }, error => {
      console.log('save error')
      res.status(400).send(error)
    })

  }, error => {
    res.status(400).send(error)
  })

}

const patchBill = (req, res) => {
  const billBody = _.pick(req.body, ['description', 'amount', 'dueTo', 'receiver'])

  if (!ObjectID.isValid(billBody.receiver)) {
    return res.status(400).send({ error: 'Invalid receiver ID' })
  }

  mongoose.model('Receiver').findById(billBody.receiver).then(receiver => {
    if (!receiver) {
      return res.status(404).send({ error: 'Receiver not found'})
    }

    Bill.findByIdAndUpdate(req.params.id, { $set: billBody }, { new: true }).then(updatedBill => {
      if (!updatedBill) {
        return res.status(404).send()
      }

      res.send(updatedBill)
    }, error => {
      res.status(400).send(error)
    })
    
  }, error => {
    res.status(400).send(error)
  })
 }

router.get('/bills', getBills)
router.post('/bills', postBill)
router.patch('/bills/:id', patchBill)

module.exports = router