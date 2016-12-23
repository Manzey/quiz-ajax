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
};

Highscore.prototype.addScore = function() {
    var result = {nick: document.querySelector("#nicknamefield").value, time: window.timer};
    var hs = [];
    if (localStorage.getItem("hs") === null) {
        localStorage.setItem("hs", JSON.stringify(hs));
    }

    hs = JSON.parse(localStorage.getItem("hs"));

    if (hs.length <= 5) {
        hs.push(result);
    } else {
        hs.splice(-1, 1, result);
    }

    localStorage.setItem("hs", JSON.stringify(hs));

    var hsS = JSON.parse(localStorage.getItem("hs"));
    hsS.sort(function(a,b) {
        return a.time - b.time;
    });

    console.log(hsS);
    document.querySelector("#hs1").innerHTML =  hsS[0].nick + " completed in " + hsS[0].time + " seconds.";
    document.querySelector("#hs2").innerHTML =  hsS[1].nick + " completed in " + hsS[1].time + " seconds.";
    document.querySelector("#hs3").innerHTML =  hsS[2].nick + " completed in " + hsS[2].time + " seconds.";
    document.querySelector("#hs4").innerHTML =  hsS[3].nick + " completed in " + hsS[3].time + " seconds.";
    document.querySelector("#hs5").innerHTML =  hsS[4].nick + " completed in " + hsS[4].time + " seconds.";
};

module.exports = Highscore;
