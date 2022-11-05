$(document).ready(onReady);

// declare global variables
let operator;

// onReady function 
function onReady(){
    $('#equals-btn').on('click', sendEquation);
    $('#clear-btn').on('click', clearCalc);
    $('.math').on('click', selectOperator);
}

// function to assign string value of operator the pressed button
function selectOperator(){
    $('.math').css('opacity','0.4');
	operator = $(this).text();
    $(this).css('opacity', '1');
    console.log('This button was clicked:', operator);
}

// sendEquation function to post equation inputs
function sendEquation(){
    console.log('Equals button clicked.');
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