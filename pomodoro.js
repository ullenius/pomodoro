// Simple Pomdoro app
// takes user input and countsdown
// when timers hits 0 an alert pops up
// @author Anosh D. Ullenius <anosh@anosh.se> 2019-03-13

var MINUTE_IN_MILLISECONDS = 60000;
var number = 0;

function bigTimer() {
  if (number != 0) {
    printTimeLeft();
    setTimeout(printMessage,number);
  }
}

function printMessage() {
  alert("Time is up! Time for a break :)");
}

// recursive method
function printTimeLeft() {
  console.log("method is called: " + number); // debug stuff

  if (number > 0) {
    number -= MINUTE_IN_MILLISECONDS;
    var timer = document.getElementById("timer");
    console.log("timer contents: " + timer.innerHTML);
    timer.innerHTML = "time left <strong>" + number/MINUTE_IN_MILLISECONDS+"</strong> minutes";
    console.log("number: " + number);
    setTimeout(printTimeLeft,MINUTE_IN_MILLISECONDS);
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
