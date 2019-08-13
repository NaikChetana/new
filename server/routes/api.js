/* define all API endpoints here */

const express = require('express')
const router = express.Router()

const User = require('../models/user')

// get request code

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    // 1.get request body
    let userData = req.body
    // 2.make user object from requested user data
    let user = new User(userData)

    // 3.save to database using mongoose
    // functions on model objects are available eg. .save()
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

module.exports = router
