/**
 * Created by manze on 2016-12-07.
 */

var Timer = function() {
    var count = 20;

    this.counter = setInterval(function() {
        count = count - 1;
        if (count <= 0) {
            document.querySelector("#mainboard").style.display = "none";
            clearInterval(this.counter);
        }

        document.querySelector("#countdown").innerHTML = count;
    }, 1000);



};



Timer.prototype.pause = function() {
    clearInterval(this.counter);
};

Timer.prototype.reset = function() {

};

module.exports = Timer;
