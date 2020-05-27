
function start() {

    let counter = 10;
    let id = setInterval(countdown, 1000);

    function countdown() {
        console.log(counter--);
        if (counter === 0) {
            clearInterval(id);
        }
    }
    countdown();
};

window.onload = start;
