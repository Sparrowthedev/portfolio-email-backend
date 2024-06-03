const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
require('dotenv').config()
const emailRoute = require("./routes/emailRoute")
const app = express();

// tools
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// random
app.use((req, res, next) => {
    console.log(req.method, req.body);
    next();
  });

// routes
app.use('/apiv1', emailRoute);


// port
const port = process.env.PORT || 8000;

// listener
app.listen(port, () => {
    console.log(`Server running on ${port}`);
})