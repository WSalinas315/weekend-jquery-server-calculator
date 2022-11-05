$(document).ready(onReady);

// declare global variables
let operator;

// onReady function 
function onReady(){
    $('#equals-btn').on('click', sendEquation);
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

}




// reset calculator
// $('.math').css('opacity','1');