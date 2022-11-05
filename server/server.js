// initialize constants for server functionality
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

// declare/define global variables
let history = require('./modules/history.js');

// serve up static files
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('server/public'));

app.get('/history', (req, res) => {
    console.log('Request for /history made');
    res.send(history);
});

app.post('/history', (req, res) => {
    console.log('Post request on /history');
    let thisEquation = req.body;
    history.push(thisEquation);
    res.sendStatus(200);
});

// app.get('/history', (req, res) => {
//     console.log('Request for /history made');
//     res.send(history);
// });

// app.post('/history', (req, res) => {
//     console.log('Post request on /history');
//     let thisEquation = req.body;
//     history.push(thisEquation);
//     res.sendStatus(200);
// });