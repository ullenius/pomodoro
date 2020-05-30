// Simple Pomdoro app
// takes user input and counts down
// when timer hits 0 an alert pops up
// @author Anosh D. Ullenius <anosh@anosh.se> 2019-2020
"use strict";

window.onload = promptInput;

function promptInput() {
    let input = prompt("Please enter length of pomodoro in minutes:");
    input = Math.trunc(input);
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
    if (Number.isNaN(number)) {
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
    const MINUTE_IN_MILLISECONDS = 60000;
    const id = setInterval(countdown, MINUTE_IN_MILLISECONDS);
    const timer = document.getElementById("timer");
    const alarm = document.getElementById("sound");

    function countdown() {
        console.log(counter); // debug
        if (counter === 0) {
            clearInterval(id);
            soundAlarm();
            printFinishMessage();
        } else {
            printTimeLeft(counter--, timer);
        }
    }

    function printTimeLeft(number) {
        const displayTime = (number < 1) ? "< 1" : number;
        const message = "Time left: " + strongTag(displayTime) + " minute(s)";
        display(message);
    }

    function printFinishMessage() {
        alert("Time is up! Time for a break :)");
        const message = strongTag("Time is up");
        display(message);
    }

    function display(html) {
        timer.innerHTML = html;
    }

    function soundAlarm() {
        alarm.play();
    }
    countdown();
}

function strongTag(text) {
    return "<strong>" + text + "</strong>";
}
