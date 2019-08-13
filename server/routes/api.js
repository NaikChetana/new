/* define all API endpoints here */

const express = require('express')
const router = express.Router()

/* connection to the database */
const mongoose = require('mongoose')
const db = "mongodb+srv://chetana_naik:pwchetana@cluster0-bstux.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(db, err => {
    if (err) {
        console.log('Error! ' + err);
    } else {
        console.log('connected to mongodb');
    }
})

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
