const express = require('express')
const bodyParser = require('body-parser')

/* create port number where express will run */
const PORT = 3000

/* create instance of express */
const app = express()

// routes defined separately
const api =require('./routes/api')

/* specify body parser to handle express data */
app.use(bodyParser.json())

// localhost:3000/api will take routes from api.js 
app.use('/api',api)


/* Listen for requets on specified port */
app.listen(PORT,()=>{
    console.log('server running on localhost:'+PORT);
})

/* test a get request */
app.get('/',(req,res)=>{
    res.send('Hello from server')
})