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

    document.querySelector("#hs1").innerHTML = document.querySelector("#nicknamefield").value + " " + window.timer;
};

Highscore.prototype.new = function() {

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
                            var nicknamefield = document.getElementById("nicknamefield");
                            var nicknameboard = document.getElementById("nicknameboard");
                            nickname = nicknamefield.value;
                            nicknameboard.style.display = "none";
                            mainboard.style.display = "block";
                            countdown.start();
                            hsCountdown.timerGo();
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
                            answerfield.style.display = "none";}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9oaWdoc2NvcmUuanMiLCJjbGllbnQvc291cmNlL2pzL3FuYS5qcyIsImNsaWVudC9zb3VyY2UvanMvdGltZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFFuYSA9IHJlcXVpcmUoXCIuL3FuYS5qc1wiKTtcblxubmV3IFFuYSgpO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTYtMTItMjIuXG4gKi9cblxuXG4vL1NhbWUgaGVyZSwgaGF2aW5nIGlzc3VlcyB3aXRoIHRoaXMgYmVpbmcgdW5kZWZpbmVkIGluIHN0cmljdCBtb2RlLCBjb3VsZG4ndCBmaW5kIGEgc29sdXRpb24uXG4vL1NlZWluZyBob3cgSSBvbmx5IGRlY2xhcmUgMyB2YXJpYWJsZXMgYW5kIGl0IGlzIGEgc21hbGwgXCJhcHBsaWNhdGlvblwiLCBJIGRvIG5vdCBzZWUgdGhlIHByb2JsZW0uXG4vL0V2ZW4gdGhvdWdoLCBJIHJlYWxpemUgaXQgaXMgYmFkIHByYWN0aWNlLCBidXQgcmF0aGVyIHRoYXQgdGhhbiBjb2RlIHRoYXQgZG9lc24ndCB3b3JrLlxuXG52YXIgSGlnaHNjb3JlID0gZnVuY3Rpb24oKSB7XG5cbn07XG5cbkhpZ2hzY29yZS5wcm90b3R5cGUudGltZXJHbyA9IGZ1bmN0aW9uKCkge1xuICAgIHdpbmRvdy50aW1lciA9IDA7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy50aW1lciA9IHdpbmRvdy50aW1lciArIDE7XG4gICAgICAgIGNvbnNvbGUubG9nKHdpbmRvdy50aW1lcik7XG4gICAgfSwgMTAwMCk7XG5cbn07XG5cbkhpZ2hzY29yZS5wcm90b3R5cGUudGltZXJTdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICBjb25zb2xlLmxvZyh3aW5kb3cudGltZXIpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoczFcIikuaW5uZXJIVE1MID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuaWNrbmFtZWZpZWxkXCIpLnZhbHVlICsgXCIgXCIgKyB3aW5kb3cudGltZXI7XG59O1xuXG5IaWdoc2NvcmUucHJvdG90eXBlLm5ldyA9IGZ1bmN0aW9uKCkge1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhpZ2hzY29yZTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYW56ZSBvbiAyMDE2LTExLTI4LlxuICovXG5cbnZhciBUaW1lciA9IHJlcXVpcmUoXCIuL3RpbWVyLmpzXCIpO1xudmFyIEhpZ2hzY29yZSA9IHJlcXVpcmUoXCIuL2hpZ2hzY29yZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBRbmEoKSB7XG4gICAgICAgIHZhciBjb3VudGRvd24gPSBuZXcgVGltZXIoKTtcbiAgICAgICAgdmFyIGhzQ291bnRkb3duID0gbmV3IEhpZ2hzY29yZSgpO1xuICAgICAgICB2YXIgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8xXCI7XG4gICAgICAgIHZhciBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdFwiKTtcbiAgICAgICAgdmFyIG5leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5leHRcIik7XG4gICAgICAgIHZhciBhbnN3ZXJmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5zd2VyZmllbGRcIik7XG4gICAgICAgIHZhciBxdWVzdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXVlc3Rpb25cIik7XG4gICAgICAgIHZhciBjb250ZW50USA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dFwiKTtcbiAgICAgICAgdmFyIHRlbXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlbXBcIik7XG4gICAgICAgIHZhciBiZWdpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmVnaW5cIik7XG4gICAgICAgIHZhciBuaWNrbmFtZSA9IFwiTm8gbmlja25hbWUgZW50ZXJlZFwiO1xuICAgICAgICB2YXIgbWFpbmJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluYm9hcmRcIik7XG4gICAgICAgIHZhciBoaWdoc2NvcmVib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaHNjb3JlYm9hcmRcIik7XG5cbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24oanNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoZU9iaiA9IEpTT04ucGFyc2UoanNvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmoubmV4dFVSTCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbmJvYXJkLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoc2NvcmVib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhzQ291bnRkb3duLnRpbWVyU3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlT2JqLnF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50US5pbm5lckhUTUwgPSBcIkdvb2Qgam9iISAtIENsaWNrIG5leHQgcXVlc3Rpb24gdG8gY29udGludWUhXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRRLmlubmVySFRNTCA9IHRoZU9iai5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmFwcGVuZENoaWxkKGNvbnRlbnRRKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZU9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmouYWx0ZXJuYXRpdmVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGFsdCBpbiB0aGVPYmouYWx0ZXJuYXRpdmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1JhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklOUFVUXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby52YWx1ZSA9IE9iamVjdC5rZXlzKHRoZU9iai5hbHRlcm5hdGl2ZXMpW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby5pZCA9IFwiYW5zd2VyZmllbGQyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKHRoZU9iai5hbHRlcm5hdGl2ZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmFkaW8ubmFtZSA9IFwiYWx0c1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGVPYmouYWx0ZXJuYXRpdmVzW2FsdF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcC5hcHBlbmRDaGlsZChuZXdSYWRpbyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyZmllbGQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5pY2tuYW1lZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5pY2tuYW1lZmllbGRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5pY2tuYW1lYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5pY2tuYW1lYm9hcmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmlja25hbWUgPSBuaWNrbmFtZWZpZWxkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lYm9hcmQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5ib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZG93bi5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhzQ291bnRkb3duLnRpbWVyR28oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZG93bi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbnMgPSBcIlNvbWV0aGluZyB3ZW50IHdyb25nIVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmouYWx0ZXJuYXRpdmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT1cXFwiYWx0c1xcXCJdOmNoZWNrZWRcIikudmFsdWV9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnMgPSBhbnN3ZXJmaWVsZC52YWx1ZTt9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHRoZU9iai5uZXh0VVJMLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeSh7YW5zd2VyOiBhbnN9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYW5zKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0T2JqID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLm9wZW4oXCJHRVRcIiwgbmV4dE9iai5uZXh0VVJMLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLnNlbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50US5pbm5lckhUTUwgPSBuZXh0T2JqLnF1ZXN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmFwcGVuZENoaWxkKGNvbnRlbnRRKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJmaWVsZC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV4dE9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGRvd24uc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlT2JqLmFsdGVybmF0aXZlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJmaWVsZDJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0cy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGFsdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJmaWVsZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge2Fuc3dlcmZpZWxkLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwifVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuXG5cbiAgICAgICAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh4bWxodHRwLnJlYWR5U3RhdGUgPT09IDQgJiYgeG1saHR0cC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhtbGh0dHAucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh4bWxodHRwLnN0YXR1cyA9PT0gNDAwIHx8IHhtbGh0dHAuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgICAgICBtYWluYm9hcmQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9zZXJib2FyZFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIGhzQ291bnRkb3duLnRpbWVyU3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHhtbGh0dHAub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuXG4gICAgICAgIHhtbGh0dHAuc2VuZCgpO1xuICAgIH07XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYW56ZSBvbiAyMDE2LTEyLTA3LlxuICovXG5cbi8vVXNlZCB3aW5kb3cgY2F1c2UgdGhpcyB3YXMgY2F1c2luZyBzb21lIGVycm9ycyBhbmQgYnVncywgbWFraW5nIHRoZSB0aW1lcnMgb3ZlcmxhcCBlYWNoIG90aGVyIGFuZCBub3Qgc3RvcCBwcm9wZXJseS5cbi8vSSByZWFsaXplIGl0IGJhZCBwcmFjdGljZSB0byB1c2Ugd2luZG93IGZvciBmdWxseSBnbG9iYWwgdmFyaWFibGVzLCBidXQgaXQgd2FzIHRoZSBvbmx5IHNvbHV0aW9uIEkgY291bGQgdGhpbmsgb2YuXG5cbnZhciBUaW1lciA9IGZ1bmN0aW9uKCkge1xufTtcblxuVGltZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgd2luZG93LmNvdW50ID0gMjA7XG4gICAgY2xlYXJJbnRlcnZhbCh3aW5kb3cuY291bnRlcik7XG4gICAgd2luZG93LmNvdW50ZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmNvdW50ID0gd2luZG93LmNvdW50IC0gMTtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3VudCA8PSAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW5ib2FyZFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvc2VyYm9hcmRcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwod2luZG93LmNvdW50ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudGRvd25cIikuaW5uZXJIVE1MID0gd2luZG93LmNvdW50O1xuICAgIH0sIDEwMDApO1xufTtcblxuVGltZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh3aW5kb3cuY291bnRlcik7XG59O1xuXG5UaW1lci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICBjbGVhckludGVydmFsKHdpbmRvdy5jb3VudGVyKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50ZG93blwiKS5pbm5lckhUTUwgPSAyMDtcbiAgICB3aW5kb3cuY291bnQgPSAyMDtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaW1lcjtcbiJdfQ==
