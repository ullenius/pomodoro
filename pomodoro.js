// Simple Pomdoro app
// takes user input and counts down
// when timer hits 0 an alert pops up
// @author Anosh D. Ullenius <anosh@anosh.se> 2019-2020
"use strict";

window.onload = init;

function init() {
	const alarm = getAlarm();
	alarm.onplay = showMuteButton;
	alarm.onended = hideMuteButton;
	alarm.onpause = hideMuteButton;
	
	const start = document.getElementById("start");
	start.onclick = promptInput;
	const muteButton = getMuteButton();
	muteButton.onclick = function() {
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
	
	const muteButton = getMuteButton();
	if (state === true) {
		muteButton.className = undefined;
	}
	else if (state === false) {
		muteButton.className = "alarm";
	}
}

function promptInput() {
    const input = getInput();
    const result = validateNumber(input);
    if (result.valid === true) {
        start(input);
    } else {
        alert("Error: " + result.message);
    }
}

function getInput() {
    const input = prompt("Please enter length of pomodoro in minutes:");
    return Math.trunc(input);
}

function validateNumber(number) {
    const result = Object.create(null);
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
    Object.freeze(result);
    return result;
}

function start(time) {
    let counter = time;
    const MINUTE_IN_MILLISECONDS = 10000;
    const id = setInterval(countdown, MINUTE_IN_MILLISECONDS);
    const timer = document.getElementById("timer");
    const alarm = getAlarm();

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
