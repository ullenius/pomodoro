// Simple Pomdoro app
// takes user input and countsdown
// when timers hits 0 an alert pops up
// @author Anosh D. Ullenius <anosh@anosh.se> 2019-03-13

var MINUTE_IN_MILLISECONDS = 60000;
var number = 0;

function bigTimer() {
  if (number != 0) {
    var numberClone = number;
    printTimeLeft();
    console.log("numberclone = " + numberClone);
    window.setTimeout(printMessage,numberClone);
  }
}

function printMessage() {
  alert("Time is up! Time for a break :)");
  var timer = document.getElementById("timer");
  timer.innerHTML = "<strong>Time is up!</strong>"; // needs refactoring
}

// recursive method
function printTimeLeft() {
  console.log("method is called: " + number); // debug stuff

  if (number > 0) {
    number -= MINUTE_IN_MILLISECONDS;
    var timer = document.getElementById("timer");
    console.log("timer contents: " + timer.innerHTML);
    var timeLeft = number/MINUTE_IN_MILLISECONDS;
    var displayTime = timeLeft;
    if (timeLeft < 1) {
	displayTime = "< 1";
    }
    timer.innerHTML = "Time left <strong>" + displayTime + "</strong> minute(s)";
    console.log("number: " + number);
    window.setTimeout(printTimeLeft,MINUTE_IN_MILLISECONDS);
  }

}

var input = prompt("Please enter length of pomodoro in minutes:");
if (!isNaN(input)) { // bug if empty String, equals 0 as number
  number = input*MINUTE_IN_MILLISECONDS; // global variabel
  bigTimer();
  console.log(MINUTE_IN_MILLISECONDS*input); // debug
} else {
  alert("Error: Input is not a number!");
}
