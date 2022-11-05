// initialize constants for server functionality
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

// declare/define global variables
let history = require('./modules/history.js');
let result = require('./modules/result.js');

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
    calculateResult();
    res.sendStatus(200);
});

app.get('/result', (req, res) => {
    console.log('Request for /result made');
    res.send(result);
});

// Function to calculate the result of a submitted equation
function calculateResult(){
    console.log('Calculating the result.');
    // could use history[history.length-1]
}

// app.post('/result', (req, res) => {
//     console.log('Post request on /result');
//     let thisEquation = req.body;
//     history.push(thisEquation);
//     res.sendStatus(200);
// });



// Set up listening on port 5000
app.listen(port, () => {
    console.log('Server is running on port:', port);
});