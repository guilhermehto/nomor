const mongoose = require('mongoose')
const validator = require('validator')

const ReceiverSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  }, email: {
    type: String,
    minlength: 4,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  }
})

const Receiver = mongoose.model('Receiver', ReceiverSchema)

module.exports = Receiver
