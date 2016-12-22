/**
 * Created by manze on 2016-12-22.
 */


//Same here, having issues with this being undefined in strict mode, couldn't find a solution.
//Seeing how I only declare 3 variables and it is a small "application", I do not see the problem.
//Even though, I realize it is bad practice, but rather that than code that doesn't work.

var Highscore = function() {

};

Highscore.prototype.timerGo = function() {
    window.timer = 0;
    clearInterval(this.timer);
    this.timer = setInterval(function() {
        window.timer = window.timer + 1;
        console.log(window.timer);
    }, 1000);

};

Highscore.prototype.timerStop = function() {
    clearInterval(this.timer);
    console.log(window.timer);

    document.querySelector("#hs1").innerHTML = document.querySelector("#nicknamefield").value + " " + window.timer;
};

Highscore.prototype.new = function() {

};

module.exports = Highscore;
