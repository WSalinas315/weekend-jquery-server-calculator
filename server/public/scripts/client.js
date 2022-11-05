$(document).ready(onReady);

// declare global variables
let eqOperator;

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
    // GET
    $.ajax({
        method: 'GET',
        url: '/result'
    }).then(function(response){
        console.log('Getting result...', response);
        render();
    }).catch(function(error){
        alert('getEquation failed:', error);
    })
}

// function for DOM rendering
function render(){

}

// clear user input fields, reset operator variable and reset operator button visibility
function clearCalc(){
    console.log('Clear button has been clicked.');
    $('.math').css('opacity','1');
    $('#first-num').val('');
    $('#second-num').val('');
    operator = '';
}