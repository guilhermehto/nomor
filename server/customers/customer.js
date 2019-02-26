const mongoose = require('mongoose')
const validator = require('validator')

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  }, email: {
    type: String,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid e-mail'
    }
  }, 
})

const Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer
