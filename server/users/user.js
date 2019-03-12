const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    }, password: {
        type: String,
        minlength: 4
    }, email: {
        type: String,
        minlength: 4,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User 
