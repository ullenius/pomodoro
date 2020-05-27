// Simple Pomdoro app
// takes user input and counts down
// when timers hits 0 an alert pops up
// @author Anosh D. Ullenius <anosh@anosh.se> 2019-2020

const MINUTE_IN_MILLISECONDS = 60000;
var number = 0;

window.onload = promptInput;

function promptInput() {
    var input = prompt("Please enter length of pomodoro in minutes:");

    const result = validateNumber(input);
    if (result.valid === true) {
       // number = input * MINUTE_IN_MILLISECONDS; // global variable
        start(input);
    } else {
        alert("Error: " + result.message);
    }
}

function validateNumber(number) {

    let result = Object.create(null);
    result.valid = false;
    if (isNaN(number)) {
        result.message = "Input is not a number!";
    } else if (number <= 0) {
        result.message = "Length is too short";
    } else if (number === Infinity) {
        result.message = "Infinity not supported";
    } else {
        result.valid = true;
    }
    return result;
}

function start(time) {

    let counter = time;
    const id = setInterval(countdown, MINUTE_IN_MILLISECONDS);

    function countdown() {
        console.log(counter - 1);
        printTimeLeft(counter--);

        if (counter === 0) {
            clearInterval(id);
            printMessage();
        }
    }
    countdown();
}

function printMessage() {
  var timer = document.getElementById("timer");
  alert("Time is up! Time for a break :)");
  timer.innerHTML = strongTag("Time is up!");
}

function printTimeLeft(number) {
  number *= MINUTE_IN_MILLISECONDS;
  var timeLeft;
  var displayTime;
  var timer = document.getElementById("timer");
  console.log("method is called: " + number); // debug stuff

  if (number > 0) {
    number -= MINUTE_IN_MILLISECONDS;
    timeLeft = number/MINUTE_IN_MILLISECONDS;

    displayTime = (timeLeft < 1) ? "< 1" : timeLeft;

    timer.innerHTML = "Time left: " + strongTag(displayTime) + " minute(s)";
  }
}

function strongTag(text) {
    return "<strong>" + text + "</strong>";
}

