(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Qna = require("./qna.js");

new Qna();

},{"./qna.js":3}],2:[function(require,module,exports){
/**
 * Created by manzey on 2016-12-22.
 */


//Same here, having issues with this being undefined in strict mode, couldn't find a solution.
//Seeing how I only declare 3 variables and it is a small "application", I do not see the problem.
//Even though, I realize it is bad practice, but rather that than code that doesn't work.

var Highscore = function() {

};


//Highscore timer, which continues to run all through the quiz.
Highscore.prototype.timerGo = function() {
    window.timer = 0;
    clearInterval(this.timer);
    this.timer = setInterval(function() {
        window.timer = window.timer + 1;
    }, 1000);

};

Highscore.prototype.timerStop = function() {
    clearInterval(this.timer);
};


//Adds the score to the highscore list, made it so it only stores 6 highscores, then it replaces the last one in the
//list, since it is not displayed anyways, just to prevent from eventually having unlimited length on the array.
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
        var submit = document.querySelector("#submit");
        var next = document.querySelector("#next");
        var answerfield = document.querySelector("#answerfield");
        var question = document.querySelector("#question");
        var contentQ = document.querySelector("#text");
        var temp = document.querySelector("#temp");
        var begin = document.querySelector("#begin");
        var nickname = "No nickname entered";
        var mainboard = document.querySelector("#mainboard");
        var highscoreboard = document.querySelector("#highscoreboard");

        var callback = function(json) {
                        var theObj = JSON.parse(json);

                        // If nextURL is undefined, the quiz is over and the highschore should appear.
                        if (theObj.nextURL === undefined) {
                            mainboard.style.display = "none";
                            highscoreboard.style.display = "block";
                            hsCountdown.timerStop();
                            hsCountdown.addScore();
                        }

                        // If the question is undefined, the question has been answered correctly and therefore it moved
                        //away from the current URL, therefore it is undefined.
                        if (theObj.question === undefined) {
                            contentQ.innerHTML = "Good job! - Click next question to continue!";
                        } else {
                            contentQ.innerHTML = theObj.question;
                        }
                        question.appendChild(contentQ);

                        // If the type of answer format is alternatives(radio), it will loop over the amount of radios
                        // and create new radios depending on the amount of alternatives.
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

                        //When the "begin" button is pressed, the quiz starts along with the timers for it!
                        begin.addEventListener("click", function() {
                            if (document.querySelector("#nicknamefield").value.length > 0) {
                                var nicknamefield = document.querySelector("#nicknamefield");
                                var nicknameboard = document.querySelector("#nicknameboard");
                                nickname = nicknamefield.value;
                                nicknameboard.style.display = "none";
                                mainboard.style.display = "block";
                                countdown.start();
                                hsCountdown.timerGo();
                            } else {document.querySelector("#nonickname").style.display = "block";}
                        });

                        //When the "submit" button is pressed, the answer is "POST":ed to the server, and the server
                        //returns and tells if the answer is wrong or not.
                        submit.addEventListener("click", function() {
                            countdown.reset();
                            var ans = "Something went wrong!";
                            if (theObj.alternatives)
                            {ans = document.querySelector("input[name=\"alts\"]:checked").value} else {
                                ans = answerfield.value;}

                            xmlhttp.open("POST", theObj.nextURL, true);
                            xmlhttp.setRequestHeader("Content-Type", "application/json");
                            xmlhttp.send(JSON.stringify({answer: ans}));

                            next.style.display = "inline";
                        });

                        //Go to the next question with this button, also checking if alternatives existed previously,
                        //If so, remove them and use the atandard answering field.
                        next.addEventListener("click", function() {
                            next.style.display = "none";
                            var nextObj = JSON.parse(json);
                            xmlhttp.open("GET", nextObj.nextURL, true);
                            xmlhttp.send();
                            contentQ.innerHTML = nextObj.question;
                            question.appendChild(contentQ);
                            answerfield.value = "";

                            countdown.start();
                            if (theObj.alternatives) {
                                var alts = document.querySelector("#answerfield2");
                                alts.parentNode.removeChild(alts);
                                temp.innerHTML = "";
                                answerfield.style.display = "none";
                            }
                            else {answerfield.style.display = "inline"}

                        });
                    };

        //Handling the server requests.
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9oaWdoc2NvcmUuanMiLCJjbGllbnQvc291cmNlL2pzL3FuYS5qcyIsImNsaWVudC9zb3VyY2UvanMvdGltZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBRbmEgPSByZXF1aXJlKFwiLi9xbmEuanNcIik7XG5cbm5ldyBRbmEoKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYW56ZXkgb24gMjAxNi0xMi0yMi5cbiAqL1xuXG5cbi8vU2FtZSBoZXJlLCBoYXZpbmcgaXNzdWVzIHdpdGggdGhpcyBiZWluZyB1bmRlZmluZWQgaW4gc3RyaWN0IG1vZGUsIGNvdWxkbid0IGZpbmQgYSBzb2x1dGlvbi5cbi8vU2VlaW5nIGhvdyBJIG9ubHkgZGVjbGFyZSAzIHZhcmlhYmxlcyBhbmQgaXQgaXMgYSBzbWFsbCBcImFwcGxpY2F0aW9uXCIsIEkgZG8gbm90IHNlZSB0aGUgcHJvYmxlbS5cbi8vRXZlbiB0aG91Z2gsIEkgcmVhbGl6ZSBpdCBpcyBiYWQgcHJhY3RpY2UsIGJ1dCByYXRoZXIgdGhhdCB0aGFuIGNvZGUgdGhhdCBkb2Vzbid0IHdvcmsuXG5cbnZhciBIaWdoc2NvcmUgPSBmdW5jdGlvbigpIHtcblxufTtcblxuXG4vL0hpZ2hzY29yZSB0aW1lciwgd2hpY2ggY29udGludWVzIHRvIHJ1biBhbGwgdGhyb3VnaCB0aGUgcXVpei5cbkhpZ2hzY29yZS5wcm90b3R5cGUudGltZXJHbyA9IGZ1bmN0aW9uKCkge1xuICAgIHdpbmRvdy50aW1lciA9IDA7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy50aW1lciA9IHdpbmRvdy50aW1lciArIDE7XG4gICAgfSwgMTAwMCk7XG5cbn07XG5cbkhpZ2hzY29yZS5wcm90b3R5cGUudGltZXJTdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbn07XG5cblxuLy9BZGRzIHRoZSBzY29yZSB0byB0aGUgaGlnaHNjb3JlIGxpc3QsIG1hZGUgaXQgc28gaXQgb25seSBzdG9yZXMgNiBoaWdoc2NvcmVzLCB0aGVuIGl0IHJlcGxhY2VzIHRoZSBsYXN0IG9uZSBpbiB0aGVcbi8vbGlzdCwgc2luY2UgaXQgaXMgbm90IGRpc3BsYXllZCBhbnl3YXlzLCBqdXN0IHRvIHByZXZlbnQgZnJvbSBldmVudHVhbGx5IGhhdmluZyB1bmxpbWl0ZWQgbGVuZ3RoIG9uIHRoZSBhcnJheS5cbkhpZ2hzY29yZS5wcm90b3R5cGUuYWRkU2NvcmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzdWx0ID0ge25pY2s6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmlja25hbWVmaWVsZFwiKS52YWx1ZSwgdGltZTogd2luZG93LnRpbWVyfTtcbiAgICB2YXIgaHMgPSBbXTtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJoc1wiKSA9PT0gbnVsbCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhzXCIsIEpTT04uc3RyaW5naWZ5KGhzKSk7XG4gICAgfVxuXG4gICAgaHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaHNcIikpO1xuXG4gICAgaWYgKGhzLmxlbmd0aCA8PSA1KSB7XG4gICAgICAgIGhzLnB1c2gocmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBocy5zcGxpY2UoLTEsIDEsIHJlc3VsdCk7XG4gICAgfVxuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoc1wiLCBKU09OLnN0cmluZ2lmeShocykpO1xuXG4gICAgdmFyIGhzUyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJoc1wiKSk7XG4gICAgaHNTLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgICAgIHJldHVybiBhLnRpbWUgLSBiLnRpbWU7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hzMVwiKS5pbm5lckhUTUwgPSAgaHNTWzBdLm5pY2sgKyBcIiBjb21wbGV0ZWQgaW4gXCIgKyBoc1NbMF0udGltZSArIFwiIHNlY29uZHMuXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoczJcIikuaW5uZXJIVE1MID0gIGhzU1sxXS5uaWNrICsgXCIgY29tcGxldGVkIGluIFwiICsgaHNTWzFdLnRpbWUgKyBcIiBzZWNvbmRzLlwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaHMzXCIpLmlubmVySFRNTCA9ICBoc1NbMl0ubmljayArIFwiIGNvbXBsZXRlZCBpbiBcIiArIGhzU1syXS50aW1lICsgXCIgc2Vjb25kcy5cIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hzNFwiKS5pbm5lckhUTUwgPSAgaHNTWzNdLm5pY2sgKyBcIiBjb21wbGV0ZWQgaW4gXCIgKyBoc1NbM10udGltZSArIFwiIHNlY29uZHMuXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoczVcIikuaW5uZXJIVE1MID0gIGhzU1s0XS5uaWNrICsgXCIgY29tcGxldGVkIGluIFwiICsgaHNTWzRdLnRpbWUgKyBcIiBzZWNvbmRzLlwiO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIaWdoc2NvcmU7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFuemUgb24gMjAxNi0xMS0yOC5cbiAqL1xuXG52YXIgVGltZXIgPSByZXF1aXJlKFwiLi90aW1lci5qc1wiKTtcbnZhciBIaWdoc2NvcmUgPSByZXF1aXJlKFwiLi9oaWdoc2NvcmUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUW5hKCkge1xuICAgICAgICB2YXIgY291bnRkb3duID0gbmV3IFRpbWVyKCk7XG4gICAgICAgIHZhciBoc0NvdW50ZG93biA9IG5ldyBIaWdoc2NvcmUoKTtcbiAgICAgICAgdmFyIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgdmFyIHVybCA9IFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMVwiO1xuICAgICAgICB2YXIgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXRcIik7XG4gICAgICAgIHZhciBuZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXh0XCIpO1xuICAgICAgICB2YXIgYW5zd2VyZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Fuc3dlcmZpZWxkXCIpO1xuICAgICAgICB2YXIgcXVlc3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3F1ZXN0aW9uXCIpO1xuICAgICAgICB2YXIgY29udGVudFEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RleHRcIik7XG4gICAgICAgIHZhciB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wXCIpO1xuICAgICAgICB2YXIgYmVnaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JlZ2luXCIpO1xuICAgICAgICB2YXIgbmlja25hbWUgPSBcIk5vIG5pY2tuYW1lIGVudGVyZWRcIjtcbiAgICAgICAgdmFyIG1haW5ib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbmJvYXJkXCIpO1xuICAgICAgICB2YXIgaGlnaHNjb3JlYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hpZ2hzY29yZWJvYXJkXCIpO1xuXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKGpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGVPYmogPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBuZXh0VVJMIGlzIHVuZGVmaW5lZCwgdGhlIHF1aXogaXMgb3ZlciBhbmQgdGhlIGhpZ2hzY2hvcmUgc2hvdWxkIGFwcGVhci5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmoubmV4dFVSTCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbmJvYXJkLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoc2NvcmVib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhzQ291bnRkb3duLnRpbWVyU3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhzQ291bnRkb3duLmFkZFNjb3JlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBxdWVzdGlvbiBpcyB1bmRlZmluZWQsIHRoZSBxdWVzdGlvbiBoYXMgYmVlbiBhbnN3ZXJlZCBjb3JyZWN0bHkgYW5kIHRoZXJlZm9yZSBpdCBtb3ZlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hd2F5IGZyb20gdGhlIGN1cnJlbnQgVVJMLCB0aGVyZWZvcmUgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU9iai5xdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFEuaW5uZXJIVE1MID0gXCJHb29kIGpvYiEgLSBDbGljayBuZXh0IHF1ZXN0aW9uIHRvIGNvbnRpbnVlIVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50US5pbm5lckhUTUwgPSB0aGVPYmoucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbi5hcHBlbmRDaGlsZChjb250ZW50USk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSB0eXBlIG9mIGFuc3dlciBmb3JtYXQgaXMgYWx0ZXJuYXRpdmVzKHJhZGlvKSwgaXQgd2lsbCBsb29wIG92ZXIgdGhlIGFtb3VudCBvZiByYWRpb3NcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBjcmVhdGUgbmV3IHJhZGlvcyBkZXBlbmRpbmcgb24gdGhlIGFtb3VudCBvZiBhbHRlcm5hdGl2ZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlT2JqLmFsdGVybmF0aXZlcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBhbHQgaW4gdGhlT2JqLmFsdGVybmF0aXZlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTlBVVFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmFkaW8udHlwZSA9IFwicmFkaW9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmFkaW8udmFsdWUgPSBPYmplY3Qua2V5cyh0aGVPYmouYWx0ZXJuYXRpdmVzKVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmFkaW8uaWQgPSBcImFuc3dlcmZpZWxkMlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhPYmplY3Qua2V5cyh0aGVPYmouYWx0ZXJuYXRpdmVzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1JhZGlvLm5hbWUgPSBcImFsdHNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhlT2JqLmFsdGVybmF0aXZlc1thbHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcC5hcHBlbmRDaGlsZCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuYXBwZW5kQ2hpbGQobmV3UmFkaW8pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcmZpZWxkLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XaGVuIHRoZSBcImJlZ2luXCIgYnV0dG9uIGlzIHByZXNzZWQsIHRoZSBxdWl6IHN0YXJ0cyBhbG9uZyB3aXRoIHRoZSB0aW1lcnMgZm9yIGl0IVxuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25pY2tuYW1lZmllbGRcIikudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmlja25hbWVmaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmlja25hbWVmaWVsZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5pY2tuYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25pY2tuYW1lYm9hcmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lID0gbmlja25hbWVmaWVsZC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmlja25hbWVib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5ib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGRvd24uc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHNDb3VudGRvd24udGltZXJHbygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNub25pY2tuYW1lXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7fVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vV2hlbiB0aGUgXCJzdWJtaXRcIiBidXR0b24gaXMgcHJlc3NlZCwgdGhlIGFuc3dlciBpcyBcIlBPU1RcIjplZCB0byB0aGUgc2VydmVyLCBhbmQgdGhlIHNlcnZlclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm5zIGFuZCB0ZWxscyBpZiB0aGUgYW5zd2VyIGlzIHdyb25nIG9yIG5vdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRkb3duLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFucyA9IFwiU29tZXRoaW5nIHdlbnQgd3JvbmchXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU9iai5hbHRlcm5hdGl2ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPVxcXCJhbHRzXFxcIl06Y2hlY2tlZFwiKS52YWx1ZX0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFucyA9IGFuc3dlcmZpZWxkLnZhbHVlO31cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAub3BlbihcIlBPU1RcIiwgdGhlT2JqLm5leHRVUkwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHthbnN3ZXI6IGFuc30pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9HbyB0byB0aGUgbmV4dCBxdWVzdGlvbiB3aXRoIHRoaXMgYnV0dG9uLCBhbHNvIGNoZWNraW5nIGlmIGFsdGVybmF0aXZlcyBleGlzdGVkIHByZXZpb3VzbHksXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHNvLCByZW1vdmUgdGhlbSBhbmQgdXNlIHRoZSBhdGFuZGFyZCBhbnN3ZXJpbmcgZmllbGQuXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dE9iaiA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1saHR0cC5vcGVuKFwiR0VUXCIsIG5leHRPYmoubmV4dFVSTCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1saHR0cC5zZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFEuaW5uZXJIVE1MID0gbmV4dE9iai5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbi5hcHBlbmRDaGlsZChjb250ZW50USk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyZmllbGQudmFsdWUgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRkb3duLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU9iai5hbHRlcm5hdGl2ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Fuc3dlcmZpZWxkMlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0cy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGFsdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcmZpZWxkLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7YW5zd2VyZmllbGQuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCJ9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgIC8vSGFuZGxpbmcgdGhlIHNlcnZlciByZXF1ZXN0cy5cbiAgICAgICAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh4bWxodHRwLnJlYWR5U3RhdGUgPT09IDQgJiYgeG1saHR0cC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhtbGh0dHAucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHhtbGh0dHAuc3RhdHVzID09PSA0MDAgfHwgeG1saHR0cC5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgICAgIG1haW5ib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb3NlcmJvYXJkXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgaHNDb3VudGRvd24udGltZXJTdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeG1saHR0cC5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XG5cbiAgICAgICAgeG1saHR0cC5zZW5kKCk7XG4gICAgfTtcblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTYtMTItMDcuXG4gKi9cblxuLy9Vc2VkIHdpbmRvdyBjYXVzZSB0aGlzIHdhcyBjYXVzaW5nIHNvbWUgZXJyb3JzIGFuZCBidWdzLCBtYWtpbmcgdGhlIHRpbWVycyBvdmVybGFwIGVhY2ggb3RoZXIgYW5kIG5vdCBzdG9wIHByb3Blcmx5LlxuLy9JIHJlYWxpemUgaXQgYmFkIHByYWN0aWNlIHRvIHVzZSB3aW5kb3cgZm9yIGZ1bGx5IGdsb2JhbCB2YXJpYWJsZXMsIGJ1dCBpdCB3YXMgdGhlIG9ubHkgc29sdXRpb24gSSBjb3VsZCB0aGluayBvZi5cblxudmFyIFRpbWVyID0gZnVuY3Rpb24oKSB7XG59O1xuXG4vL1RoZSB0aW1lciBmb3IgZWFjaCBxdWVzdGlvbiwgdGhpcyBvbmUgYWxzbyBnb3QgYSByZXNldCBidXR0b24sIHNpbmNlIGl0IG5lZWRzIHRvIHJlc2V0IGFmdGVyIGVhY2ggcXVlc3Rpb24uXG5UaW1lci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB3aW5kb3cuY291bnQgPSAyMDtcbiAgICBjbGVhckludGVydmFsKHdpbmRvdy5jb3VudGVyKTtcbiAgICB3aW5kb3cuY291bnRlciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cuY291bnQgPSB3aW5kb3cuY291bnQgLSAxO1xuICAgICAgICBpZiAod2luZG93LmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbmJvYXJkXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9zZXJib2FyZFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh3aW5kb3cuY291bnRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50ZG93blwiKS5pbm5lckhUTUwgPSB3aW5kb3cuY291bnQ7XG4gICAgfSwgMTAwMCk7XG59O1xuXG5UaW1lci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICBjbGVhckludGVydmFsKHdpbmRvdy5jb3VudGVyKTtcbn07XG5cblRpbWVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgIGNsZWFySW50ZXJ2YWwod2luZG93LmNvdW50ZXIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRkb3duXCIpLmlubmVySFRNTCA9IDIwO1xuICAgIHdpbmRvdy5jb3VudCA9IDIwO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbWVyO1xuIl19
