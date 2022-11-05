const results = require("../../modules/result");

$(document).ready(onReady);

// declare global variables
let eqOperator;
let displayHistory =[];
let displayResults = [];

// onReady function 
function onReady(){
    $('#equals-btn').on('click', sendEquation);
    $('#clear-btn').on('click', clearCalc);
    $('.math').on('click', selectOperator);
}

// function to assign string value of operator the pressed button
function selectOperator(){
    $('.math').css('opacity','0.4');
	eqOperator = $(this).text();
    $(this).css('opacity', '1');
    console.log('This button was clicked:', operator);
}

// sendEquation function to post equation inputs
function sendEquation(){
    console.log('Equals button clicked.');
    // POST
    $.ajax({
        method: 'POST',
        url: '/history',
        data: {
            operandOne: $('#first-num').val(),
            operandTwo: $('#second-num').val(),
            operator: eqOperator
        }
    }).then(function(response){
        console.log('Posting equation...', response);
        getEquation();
    }).catch(function(error){
        alert('sendEquation failed', error);
    })
}

// getEquation function to return result
function getEquation(){
    console.log('Getting equation results...');
    // clear results array
    displayResults = [];
    // GET
    $.ajax({
        method: 'GET',
        url: '/result'
    }).then(function(response){
        console.log('Getting result...', response);
        displayResults = response;
        render();
    }).catch(function(error){
        alert('getEquation failed:', error);
    })
}

// getHistory function to return past equations
function getHistory(){
    console.log('Getting equation history...');
    // clear history array
    displayHistory = [];
    // GET
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(response){
        console.log('Getting history...', response);
        displayHistory = response;
    }).catch(function(error){
        alert('getHistory failed:', error);
    })
}

// function for DOM rendering
function render(){
    console.log('Houston, we are rendering.');
    // empty #results and #history divs
    $('#results').empty();
    $('#history').empty();
    // write answer to results div
    $('#results').append(`
        <h2>${displayResults[displayResults.length-1]}</h2>
    `);
    // write past equations to history div
    for(let i = 0; i< displayHistory.length; i++){
        $('#history').prepend(`
            <p id=${i}>${displayHistory[i].operandOne} ${displayHistory[i].operator} ${displayHistory[i].operandTwo} = ${displayResults[i]}
        `);
    }
}

// clear user input fields, reset operator variable and reset operator button visibility
function clearCalc(){
    console.log('Clear button has been clicked.');
    $('.math').css('opacity','1');
    $('#first-num').val('');
    $('#second-num').val('');
    operator = '';
}