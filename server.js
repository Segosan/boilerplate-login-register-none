const express = require('express');
const connectDB = require('./DB/connection')
const app = express();
const bodyParser = require('body-parser')
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/index'));



let renderHTML = path.resolve(__dirname, './public/index.html');

app.get('/', function (req, res) {
    res.sendFile(renderHTML);
})

const Port = process.env.Port || 8080;

app.listen(Port, () => console.log("server started"));