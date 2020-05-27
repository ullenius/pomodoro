// Simple Pomdoro app
// takes user input and counts down
// when timers hits 0 an alert pops up
// @author Anosh D. Ullenius <anosh@anosh.se> 2019-2020
"use strict";

const MINUTE_IN_MILLISECONDS = 60000;
window.onload = promptInput;

function promptInput() {
    var input = prompt("Please enter length of pomodoro in minutes:");

    const result = validateNumber(input);
    if (result.valid === true) {
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
    const timer = document.getElementById("timer");

    function countdown() {
        console.log(counter); // debug
        if (counter === 0) {
            clearInterval(id);
            printFinishMessage(timer);
        } else {
            printTimeLeft(counter--, timer);
        }
    }
    countdown();
}

function printTimeLeft(number, timer) {
    var displayTime = (number < 1) ? "< 1" : number;
    timer.innerHTML = "Time left: " + strongTag(displayTime) + " minute(s)";
}

function printFinishMessage(timer) {
    alert("Time is up! Time for a break :)");
    timer.innerHTML = strongTag("Time is up!");
}

function strongTag(text) {
    return "<strong>" + text + "</strong>";
}
