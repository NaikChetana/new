const mongoose = require('mongoose');

/* get instance of mongoose schema */
const Schema = mongoose.Schema

/* create a new schema for user data in mongoDB */

const userSchema = new Schema({
    email: String,
    password: String
})

/* create model from Schema and export it .model(<modelName>,<schema>,<collection in DB>) */
module.exports=mongoose.model('user',userSchema,'USERS')