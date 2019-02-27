const mongoose = require('mongoose')

const BillSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  }, dueTo: {
    type: Number,
    require: true
  }, paid: {
    type: Boolean,
    default: false
  }, receiver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Receiver'
  }
})

const Bill = mongoose.model('Bill', BillSchema)

module.exports = Bill
