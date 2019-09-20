/* define all API endpoints here */

const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router()

/* connection to the database */
const mongoose = require('mongoose')
const db = "mongodb+srv://chetana_naik:pwchetana@cluster0-bstux.mongodb.net/eventsDB?retryWrites=true&w=majority"

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
            let payload = { subject: user._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;

    // Model that we want to find on
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error); // if error
        } else if (!user) {
            res.status(401).send('Invalid Email.'); // user not found
        } else if (userData.password !== user.password) {
            res.status(401).send('Invalid Password');
        } else {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token })
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "event 1",
            "description": "description 1",
            "date": "2019-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "event 2",
            "description": "description 2",
            "date": "2019-04-23T18:25:43.511Z"
        }

    ];
    res.json(events)
})

// verify if authorized user
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request no auth header ')
    }
    
    let token = req.headers.authorization.split(' ')[1];
    if (token === null) {
        return res.status(401).send('Unauthorized request token null')
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized request token not verified ')
    }
    req.userId = payload.subject
    next()
}

router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "event 1",
            "description": "description 1",
            "date": "2019-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "event 2",
            "description": "description 2",
            "date": "2019-04-23T18:25:43.511Z"
        }

    ];
    res.json(events)
})
module.exports = router
