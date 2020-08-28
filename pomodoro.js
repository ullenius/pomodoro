"use strict";
// Simple Pomdoro app
// takes user input and counts down
// when timer hits 0 an alert pops up
// @author Anosh D. Ullenius <anosh@anosh.se> 2019-2020

window.onload = init;

function init() {
	var alarm = getAlarm();
	alarm.onplay = showMuteButton;
	alarm.onended = hideMuteButton;
	alarm.onpause = hideMuteButton;
	
	var start = document.getElementById("start");
	start.onclick = promptInput;
	var muteButton = getMuteButton();
	muteButton.onclick = function mute() {
		alarm.pause();
		alarm.currentTime = 0;
	};
}

function getAlarm() {
	return getObject("sound");
}

function getMuteButton() {
	return getObject("mute");
}

function getObject(id) {
	return document.getElementById(id);
}

function showMuteButton() {
	muteButtonVisible(true);
}

function hideMuteButton() {
	muteButtonVisible(false);
}

function muteButtonVisible(state) {
	
	var muteButton = getMuteButton();
	muteButton.className = (state === true) ? undefined : "alarm";
}

function promptInput() {
    var input = getInput();
    var result = validateNumber(input);
    if (result.valid === true) {
        start(input);
    } else {
        alert("Error: " + result.message);
    }
}

function getInput() {
    var input = prompt("Please enter length of pomodoro in minutes:");
    return Math.trunc(input);
}

function validateNumber(number) {
    const result = Object.create(null);
    result.valid = false;
    if (Number.isNaN(number)) {
        result.message = "Input is not a number!";
    } else if (number <= 0) {
        result.message = "Length is too short";
    } else if (number === Infinity || number === -Infinity) {
        result.message = "Infinity not supported";
    } else {
        result.valid = true;
    }
    Object.freeze(result);
    return result;
}

function start(time) {
    var counter = time;
    var MINUTE_IN_MILLISECONDS = 60000;
    const id = setInterval(countdown, MINUTE_IN_MILLISECONDS);
    var timer = document.getElementById("timer");
    var alarm = getAlarm();

    function countdown() {
        console.log(counter); // debug
        if (counter === 0) {
            clearInterval(id);
            soundAlarm();
            printFinishMessage();
        } else {
            printTimeLeft(counter--);
        }
    }

    function printTimeLeft(number) {
        var displayTime = (number < 1) ? "< 1" : number;
        var message = `Time left: ${strongTag(displayTime)}  minute(s)`;
        display(message);
    }

    function printFinishMessage() {
        alert("Time is up! Time for a break :)");
        var message = strongTag("Time is up");
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
