// initialize constants for server functionality
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

// declare/define global variables
let history = require('./modules/history.js');
let results = require('./modules/result.js');

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
    console.log('Verify data. Operand 1 is:', history[history.length-1].operandOne, 'Operand 2 is: ', history[history.length-1].operandTwo, 'Operator is:', history[history.length-1].operator);
    // switch statement to determine the result based on operator posted. Push outcome to results array
    switch(history[history.length-1].operator){
        case '+':
            results.push((history[history.length-1].operandOne + history[history.length-1].operandTwo));
            break;
        case '-':
            results.push((history[history.length-1].operandOne + history[history.length-1].operandTwo));
            break;
        case '*':
            results.push((history[history.length-1].operandOne + history[history.length-1].operandTwo));
            break;
        case '/':
            results.push((history[history.length-1].operandOne + history[history.length-1].operandTwo));
            break;
    }
    console.log('Calculated result:', results[results.length-1]);
}



// Set up listening on port 5000
app.listen(port, () => {
    console.log('Server is running on port:', port);
});