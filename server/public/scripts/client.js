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
    $('#del-btn').on('click', deleteHistory);
    $('#history').on('click', '.history-item', reRun);
    getEquation();
    setTimeout(function(){
        $('#results').empty();
    }, 10);
}

// function to assign string value of operator the pressed button
function selectOperator(){
    $('.math').css('opacity','0.4');
	eqOperator = $(this).text();
    $(this).css('opacity', '1');
    console.log('This button was clicked:', eqOperator);
}

// sendEquation function to post equation inputs
function sendEquation(){
    console.log('Equals button clicked.');
    // check that all inputs are appropriately populated
    if(($('#first-num').val == '') || ($('#second-num').val() == '')){
        alert('Both operands must have a value before a calculation can be made.');
        return;
    } else if(eqOperator == ''){
        alert('An operator must be selected.');
        return;
    }
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
        resetOperatorBtns();
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
        console.log('Result status: Got', response);
        displayResults = response;
        getHistory();
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
        console.log('History status: Got', response);
        displayHistory = response;
        render();
    }).catch(function(error){
        alert('getHistory failed:', error);
    })
}

// deleteHistory function to clear arrays of past equations and results
function deleteHistory(){
    console.log('Making request to delete history...');
    // DELETE
    $.ajax({
        method: 'DELETE',
        url: '/history',
        data: {method: 'delete'}
    }).then(function(response){
        console.log('History has been erased.', response);
        // render but the right way
        getEquation();
    }).catch(function(error){
        console.log('Error erasing history: ', error);
    })
}

// function for DOM rendering
function render(){
    console.log('Houston, we are rendering.');
    // empty #results and #history divs
    $('#results').empty();
    $('#history').empty();
    // write answer to results div
    if(displayResults[displayResults.length-1] == null){
        console.log('Skip printing results.');
    } else {
        $('#results').append(`
            <h2>${displayResults[displayResults.length-1]}</h2>
        `);
    }
    // write past equations to history div
    console.log('Time to write history!');
    for(let i = 0; i< displayHistory.length; i++){
        $('#history').append(`
            <div class="history-item" id=${i}>${displayHistory[i].operandOne} ${displayHistory[i].operator} ${displayHistory[i].operandTwo} = ${displayResults[i]}</div>
        `);
    }
}

// clear user input fields, reset operator variable and reset operator button visibility
function clearCalc(){
    console.log('Clear button has been clicked.');
    $('#first-num').val('');
    $('#second-num').val('');
    resetOperatorBtns();
}

// reset operator buttons to initial state
function resetOperatorBtns(){
    $('.math').css('opacity','1');
    eqOperator = '';
}

function reRun(){
    // find index number of clicked equation
    let index = $(this).attr("id");
    console.log('Finding item index for reRun:', index);
    // reset input fields with previous numbers
    $('#first-num').val(`${displayHistory[index].operandOne}`);
    $('#second-num').val(`${displayHistory[index].operandTwo}`);

    // POST
    $.ajax({
        method: 'POST',
        url: '/history',
        data: {
            operandOne: displayHistory[index].operandOne,
            operandTwo: displayHistory[index].operandTwo,
            operator: displayHistory[index].operator
        }
    }).then(function(response){
        console.log('Re-running equation...', response);
        getEquation();
        resetOperatorBtns();
    }).catch(function(error){
        alert('sendEquation failed', error);
    })
}