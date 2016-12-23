(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Qna = require("./qna.js");

new Qna();

},{"./qna.js":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
/**
 * Created by manze on 2016-11-28.
 */

var Timer = require("./timer.js");
var Highscore = require("./highscore.js");

module.exports = function Qna() {
        var countdown = new Timer();
        var hsCountdown = new Highscore();
        var xmlhttp = new XMLHttpRequest();
        var url = "http://vhost3.lnu.se:20080/question/1";
        var submit = document.getElementById("submit");
        var next = document.getElementById("next");
        var answerfield = document.getElementById("answerfield");
        var question = document.getElementById("question");
        var contentQ = document.getElementById("text");
        var temp = document.getElementById("temp");
        var begin = document.getElementById("begin");
        var nickname = "No nickname entered";
        var mainboard = document.getElementById("mainboard");
        var highscoreboard = document.getElementById("highscoreboard");

        var callback = function(json) {
                        var theObj = JSON.parse(json);

                        if (theObj.nextURL === undefined) {
                            mainboard.style.display = "none";
                            highscoreboard.style.display = "block";
                            hsCountdown.timerStop();
                            hsCountdown.addScore();
                        }

                        if (theObj.question === undefined) {
                            contentQ.innerHTML = "Good job! - Click next question to continue!";
                        } else {
                            contentQ.innerHTML = theObj.question;
                        }

                        question.appendChild(contentQ);
                        console.log(theObj);

                        if (theObj.alternatives) {

                            var i = -1;
                            for (var alt in theObj.alternatives) {
                                i += 1;
                                var newRadio = document.createElement("INPUT");
                                newRadio.type = "radio";
                                newRadio.value = Object.keys(theObj.alternatives)[i];
                                newRadio.id = "answerfield2";
                                console.log(Object.keys(theObj.alternatives));
                                newRadio.name = "alts";
                                var value = document.createTextNode(theObj.alternatives[alt]);
                                temp.appendChild(value);
                                temp.appendChild(newRadio);

                                answerfield.style.display = "none";
                            }

                        }

                        begin.addEventListener("click", function() {
                            if (document.querySelector("#nicknamefield").value.length > 0) {
                                var nicknamefield = document.getElementById("nicknamefield");
                                var nicknameboard = document.getElementById("nicknameboard");
                                nickname = nicknamefield.value;
                                nicknameboard.style.display = "none";
                                mainboard.style.display = "block";
                                countdown.start();
                                hsCountdown.timerGo();
                            } else {document.querySelector("#nonickname").style.display = "block";}
                        });

                        submit.addEventListener("click", function() {
                            countdown.reset();
                            var ans = "Something went wrong!";
                            if (theObj.alternatives)
                            {ans = document.querySelector("input[name=\"alts\"]:checked").value} else {
                                ans = answerfield.value;}

                            xmlhttp.open("POST", theObj.nextURL, true);
                            xmlhttp.setRequestHeader("Content-Type", "application/json");
                            xmlhttp.send(JSON.stringify({answer: ans}));
                            console.log(JSON.stringify(ans));

                            next.style.display = "inline";
                        });

                        next.addEventListener("click", function() {
                            next.style.display = "none";
                            var nextObj = JSON.parse(json);
                            xmlhttp.open("GET", nextObj.nextURL, true);
                            xmlhttp.send();
                            contentQ.innerHTML = nextObj.question;
                            question.appendChild(contentQ);
                            answerfield.value = "";
                            console.log(nextObj);

                            countdown.start();
                            if (theObj.alternatives) {
                                var alts = document.getElementById("answerfield2");
                                alts.parentNode.removeChild(alts);
                                temp.innerHTML = "";
                                answerfield.style.display = "none";
                            }
                            else {answerfield.style.display = "inline"}

                        });
                    };

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                callback(xmlhttp.responseText);
            }

            if (xmlhttp.status === 400 || xmlhttp.status === 404) {
                mainboard.style.display = "none";
                document.querySelector("#loserboard").style.display = "block";
                hsCountdown.timerStop();
            }
        };

        xmlhttp.open("GET", url, true);

        xmlhttp.send();
    };


},{"./highscore.js":2,"./timer.js":4}],4:[function(require,module,exports){
/**
 * Created by manze on 2016-12-07.
 */

//Used window cause this was causing some errors and bugs, making the timers overlap each other and not stop properly.
//I realize it bad practice to use window for fully global variables, but it was the only solution I could think of.

var Timer = function() {
};

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9oaWdoc2NvcmUuanMiLCJjbGllbnQvc291cmNlL2pzL3FuYS5qcyIsImNsaWVudC9zb3VyY2UvanMvdGltZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUW5hID0gcmVxdWlyZShcIi4vcW5hLmpzXCIpO1xuXG5uZXcgUW5hKCk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFuemUgb24gMjAxNi0xMi0yMi5cbiAqL1xuXG5cbi8vU2FtZSBoZXJlLCBoYXZpbmcgaXNzdWVzIHdpdGggdGhpcyBiZWluZyB1bmRlZmluZWQgaW4gc3RyaWN0IG1vZGUsIGNvdWxkbid0IGZpbmQgYSBzb2x1dGlvbi5cbi8vU2VlaW5nIGhvdyBJIG9ubHkgZGVjbGFyZSAzIHZhcmlhYmxlcyBhbmQgaXQgaXMgYSBzbWFsbCBcImFwcGxpY2F0aW9uXCIsIEkgZG8gbm90IHNlZSB0aGUgcHJvYmxlbS5cbi8vRXZlbiB0aG91Z2gsIEkgcmVhbGl6ZSBpdCBpcyBiYWQgcHJhY3RpY2UsIGJ1dCByYXRoZXIgdGhhdCB0aGFuIGNvZGUgdGhhdCBkb2Vzbid0IHdvcmsuXG5cbnZhciBIaWdoc2NvcmUgPSBmdW5jdGlvbigpIHtcblxufTtcblxuSGlnaHNjb3JlLnByb3RvdHlwZS50aW1lckdvID0gZnVuY3Rpb24oKSB7XG4gICAgd2luZG93LnRpbWVyID0gMDtcbiAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LnRpbWVyID0gd2luZG93LnRpbWVyICsgMTtcbiAgICAgICAgY29uc29sZS5sb2cod2luZG93LnRpbWVyKTtcbiAgICB9LCAxMDAwKTtcblxufTtcblxuSGlnaHNjb3JlLnByb3RvdHlwZS50aW1lclN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICAgIGNvbnNvbGUubG9nKHdpbmRvdy50aW1lcik7XG59O1xuXG5IaWdoc2NvcmUucHJvdG90eXBlLmFkZFNjb3JlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtuaWNrOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25pY2tuYW1lZmllbGRcIikudmFsdWUsIHRpbWU6IHdpbmRvdy50aW1lcn07XG4gICAgdmFyIGhzID0gW107XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaHNcIikgPT09IG51bGwpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoc1wiLCBKU09OLnN0cmluZ2lmeShocykpO1xuICAgIH1cblxuICAgIGhzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhzXCIpKTtcblxuICAgIGlmIChocy5sZW5ndGggPD0gNSkge1xuICAgICAgICBocy5wdXNoKHJlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaHMuc3BsaWNlKC0xLCAxLCByZXN1bHQpO1xuICAgIH1cblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaHNcIiwgSlNPTi5zdHJpbmdpZnkoaHMpKTtcblxuICAgIHZhciBoc1MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaHNcIikpO1xuICAgIGhzUy5zb3J0KGZ1bmN0aW9uKGEsYikge1xuICAgICAgICByZXR1cm4gYS50aW1lIC0gYi50aW1lO1xuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coaHNTKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hzMVwiKS5pbm5lckhUTUwgPSAgaHNTWzBdLm5pY2sgKyBcIiBjb21wbGV0ZWQgaW4gXCIgKyBoc1NbMF0udGltZSArIFwiIHNlY29uZHMuXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoczJcIikuaW5uZXJIVE1MID0gIGhzU1sxXS5uaWNrICsgXCIgY29tcGxldGVkIGluIFwiICsgaHNTWzFdLnRpbWUgKyBcIiBzZWNvbmRzLlwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaHMzXCIpLmlubmVySFRNTCA9ICBoc1NbMl0ubmljayArIFwiIGNvbXBsZXRlZCBpbiBcIiArIGhzU1syXS50aW1lICsgXCIgc2Vjb25kcy5cIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hzNFwiKS5pbm5lckhUTUwgPSAgaHNTWzNdLm5pY2sgKyBcIiBjb21wbGV0ZWQgaW4gXCIgKyBoc1NbM10udGltZSArIFwiIHNlY29uZHMuXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoczVcIikuaW5uZXJIVE1MID0gIGhzU1s0XS5uaWNrICsgXCIgY29tcGxldGVkIGluIFwiICsgaHNTWzRdLnRpbWUgKyBcIiBzZWNvbmRzLlwiO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIaWdoc2NvcmU7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFuemUgb24gMjAxNi0xMS0yOC5cbiAqL1xuXG52YXIgVGltZXIgPSByZXF1aXJlKFwiLi90aW1lci5qc1wiKTtcbnZhciBIaWdoc2NvcmUgPSByZXF1aXJlKFwiLi9oaWdoc2NvcmUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUW5hKCkge1xuICAgICAgICB2YXIgY291bnRkb3duID0gbmV3IFRpbWVyKCk7XG4gICAgICAgIHZhciBoc0NvdW50ZG93biA9IG5ldyBIaWdoc2NvcmUoKTtcbiAgICAgICAgdmFyIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgdmFyIHVybCA9IFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMVwiO1xuICAgICAgICB2YXIgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRcIik7XG4gICAgICAgIHZhciBuZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXh0XCIpO1xuICAgICAgICB2YXIgYW5zd2VyZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuc3dlcmZpZWxkXCIpO1xuICAgICAgICB2YXIgcXVlc3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1ZXN0aW9uXCIpO1xuICAgICAgICB2YXIgY29udGVudFEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHRcIik7XG4gICAgICAgIHZhciB0ZW1wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wXCIpO1xuICAgICAgICB2YXIgYmVnaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJlZ2luXCIpO1xuICAgICAgICB2YXIgbmlja25hbWUgPSBcIk5vIG5pY2tuYW1lIGVudGVyZWRcIjtcbiAgICAgICAgdmFyIG1haW5ib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbmJvYXJkXCIpO1xuICAgICAgICB2YXIgaGlnaHNjb3JlYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZ2hzY29yZWJvYXJkXCIpO1xuXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKGpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGVPYmogPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlT2JqLm5leHRVUkwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5ib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaHNjb3JlYm9hcmQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoc0NvdW50ZG93bi50aW1lclN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoc0NvdW50ZG93bi5hZGRTY29yZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlT2JqLnF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50US5pbm5lckhUTUwgPSBcIkdvb2Qgam9iISAtIENsaWNrIG5leHQgcXVlc3Rpb24gdG8gY29udGludWUhXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRRLmlubmVySFRNTCA9IHRoZU9iai5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb24uYXBwZW5kQ2hpbGQoY29udGVudFEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhlT2JqKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU9iai5hbHRlcm5hdGl2ZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYWx0IGluIHRoZU9iai5hbHRlcm5hdGl2ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UmFkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU5QVVRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1JhZGlvLnR5cGUgPSBcInJhZGlvXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1JhZGlvLnZhbHVlID0gT2JqZWN0LmtleXModGhlT2JqLmFsdGVybmF0aXZlcylbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1JhZGlvLmlkID0gXCJhbnN3ZXJmaWVsZDJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coT2JqZWN0LmtleXModGhlT2JqLmFsdGVybmF0aXZlcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby5uYW1lID0gXCJhbHRzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoZU9iai5hbHRlcm5hdGl2ZXNbYWx0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuYXBwZW5kQ2hpbGQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLmFwcGVuZENoaWxkKG5ld1JhZGlvKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJmaWVsZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuaWNrbmFtZWZpZWxkXCIpLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5pY2tuYW1lZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5pY2tuYW1lZmllbGRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuaWNrbmFtZWJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuaWNrbmFtZWJvYXJkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuaWNrbmFtZSA9IG5pY2tuYW1lZmllbGQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lYm9hcmQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluYm9hcmQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRkb3duLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhzQ291bnRkb3duLnRpbWVyR28oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbm9uaWNrbmFtZVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO31cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZG93bi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbnMgPSBcIlNvbWV0aGluZyB3ZW50IHdyb25nIVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmouYWx0ZXJuYXRpdmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT1cXFwiYWx0c1xcXCJdOmNoZWNrZWRcIikudmFsdWV9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnMgPSBhbnN3ZXJmaWVsZC52YWx1ZTt9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHRoZU9iai5uZXh0VVJMLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeSh7YW5zd2VyOiBhbnN9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYW5zKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0T2JqID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLm9wZW4oXCJHRVRcIiwgbmV4dE9iai5uZXh0VVJMLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLnNlbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50US5pbm5lckhUTUwgPSBuZXh0T2JqLnF1ZXN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmFwcGVuZENoaWxkKGNvbnRlbnRRKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJmaWVsZC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV4dE9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGRvd24uc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlT2JqLmFsdGVybmF0aXZlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5zd2VyZmllbGQyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYWx0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyZmllbGQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHthbnN3ZXJmaWVsZC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh4bWxodHRwLnJlYWR5U3RhdGUgPT09IDQgJiYgeG1saHR0cC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhtbGh0dHAucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHhtbGh0dHAuc3RhdHVzID09PSA0MDAgfHwgeG1saHR0cC5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgICAgIG1haW5ib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb3NlcmJvYXJkXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgaHNDb3VudGRvd24udGltZXJTdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeG1saHR0cC5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XG5cbiAgICAgICAgeG1saHR0cC5zZW5kKCk7XG4gICAgfTtcblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTYtMTItMDcuXG4gKi9cblxuLy9Vc2VkIHdpbmRvdyBjYXVzZSB0aGlzIHdhcyBjYXVzaW5nIHNvbWUgZXJyb3JzIGFuZCBidWdzLCBtYWtpbmcgdGhlIHRpbWVycyBvdmVybGFwIGVhY2ggb3RoZXIgYW5kIG5vdCBzdG9wIHByb3Blcmx5LlxuLy9JIHJlYWxpemUgaXQgYmFkIHByYWN0aWNlIHRvIHVzZSB3aW5kb3cgZm9yIGZ1bGx5IGdsb2JhbCB2YXJpYWJsZXMsIGJ1dCBpdCB3YXMgdGhlIG9ubHkgc29sdXRpb24gSSBjb3VsZCB0aGluayBvZi5cblxudmFyIFRpbWVyID0gZnVuY3Rpb24oKSB7XG59O1xuXG5UaW1lci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB3aW5kb3cuY291bnQgPSAyMDtcbiAgICBjbGVhckludGVydmFsKHdpbmRvdy5jb3VudGVyKTtcbiAgICB3aW5kb3cuY291bnRlciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cuY291bnQgPSB3aW5kb3cuY291bnQgLSAxO1xuICAgICAgICBpZiAod2luZG93LmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbmJvYXJkXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9zZXJib2FyZFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh3aW5kb3cuY291bnRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50ZG93blwiKS5pbm5lckhUTUwgPSB3aW5kb3cuY291bnQ7XG4gICAgfSwgMTAwMCk7XG59O1xuXG5UaW1lci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICBjbGVhckludGVydmFsKHdpbmRvdy5jb3VudGVyKTtcbn07XG5cblRpbWVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgIGNsZWFySW50ZXJ2YWwod2luZG93LmNvdW50ZXIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRkb3duXCIpLmlubmVySFRNTCA9IDIwO1xuICAgIHdpbmRvdy5jb3VudCA9IDIwO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbWVyO1xuIl19
