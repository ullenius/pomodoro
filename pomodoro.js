// Simple Pomdoro app
// takes user input and countsdown
// when timers hits 0 an alert pops up
// @author Anosh D. Ullenius <anosh@anosh.se> 2019-03-13

const MINUTE_IN_MILLISECONDS = 60000;
var number = 0;
var input = prompt("Please enter length of pomodoro in minutes:");

if (isNaN(input)) {
  alert("Error: Input is not a number!");
} else if (input <= 0) {
  alert("Error: Length is too short");
} else {
  number = input*MINUTE_IN_MILLISECONDS; // global variable
  bigTimer();
  console.log(MINUTE_IN_MILLISECONDS * input); // debug
}

function bigTimer() {
  var numberClone;
  if (number != 0) {
    numberClone = number;
    printTimeLeft();
    console.log("numberclone = " + numberClone);
    window.setTimeout(printMessage,numberClone);
  }
}

function printMessage() {
  var timer = document.getElementById("timer");
  alert("Time is up! Time for a break :)");
  timer.innerHTML = "<strong>Time is up!</strong>"; // needs refactoring
}

// recursive method
function printTimeLeft() {
  var timeLeft;
  var displayTime;
  var timer = document.getElementById("timer");
  console.log("method is called: " + number); // debug stuff

  if (number > 0) {
    number -= MINUTE_IN_MILLISECONDS;
    timeLeft = number/MINUTE_IN_MILLISECONDS;
    displayTime = timeLeft;
    if (timeLeft < 1) {
	     displayTime = "< 1";
    }
    timer.innerHTML = "Time left <strong>" + displayTime + "</strong> minute(s)";
    window.setTimeout(printTimeLeft,MINUTE_IN_MILLISECONDS);
  }

}
