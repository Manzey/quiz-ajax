/**
 * Created by manze on 2016-12-07.
 */

//Used window cause this was causing some errors and bugs, making the timers overlap each other and not stop properly.
//I realize it bad practice to use window for fully global variables, but it was the only solution I could think of.

var Timer = function() {
};

//The timer for each question, this one also got a reset button, since it needs to reset after each question.
Timer.prototype.start = function() {
    window.count = 20;
    clearInterval(window.counter);
    window.counter = setInterval(function() {
        window.count = window.count - 1;
        if (window.count <= 0) {
            document.querySelector("#mainboard").style.display = "none";
            document.querySelector("#loserboard").style.display = "block";
            clearInterval(window.counter);
        }

        document.querySelector("#countdown").innerHTML = window.count;
    }, 1000);
};

Timer.prototype.pause = function() {
    clearInterval(window.counter);
};

Timer.prototype.reset = function() {
    clearInterval(window.counter);
    document.querySelector("#countdown").innerHTML = 20;
    window.count = 20;

};

module.exports = Timer;
