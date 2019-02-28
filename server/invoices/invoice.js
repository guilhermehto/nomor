const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 3
  }, amount: {
    type: Number,
    required: true
  }, dueTo: {
    type: Number
  }, paid: {
    type: Boolean,
    default: false
  }, customer: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer'
  }
})

const Invoice = mongoose.model('Invoice', InvoiceSchema)

module.exports = Invoice
