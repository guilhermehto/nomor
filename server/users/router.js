const User = require('./user')
const router = require('express').Router()
const _ = require('lodash')

const postUser = (req, res) => {
    const userBody = _.pick(req.body, ['name', 'password', 'email'])
    const user = new User(userBody)
    user.save().then(newUser => {
        res.send(newUser)
    }, error => {
        res.send(error)
    })
}


router.post('/users', postUser)

module.exports = router
