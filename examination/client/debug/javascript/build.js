(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Qna = require("./qna.js");

new Qna();

},{"./qna.js":2}],2:[function(require,module,exports){
/**
 * Created by manze on 2016-11-28.
 */

var Timer = require("./timer.js");

module.exports = function Qna() {
        var countdown = new Timer();
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
                            var alts = document.getElementById("answerfield2");
                            alts.parentNode.removeChild(alts);
                            temp.innerHTML = "";
                            if (theObj.alternatives) {answerfield.style.display = "none";}
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
            }
        };

        xmlhttp.open("GET", url, true);

        xmlhttp.send();
    };


},{"./timer.js":3}],3:[function(require,module,exports){
/**
 * Created by manze on 2016-12-07.
 */

//Used window cause this was causing some errors and bugs, making the timers overlap eachother and not stop properly.
var Timer = function() {
    window.ccount = 20;
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

};

module.exports = Timer;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9xbmEuanMiLCJjbGllbnQvc291cmNlL2pzL3RpbWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBRbmEgPSByZXF1aXJlKFwiLi9xbmEuanNcIik7XG5cbm5ldyBRbmEoKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYW56ZSBvbiAyMDE2LTExLTI4LlxuICovXG5cbnZhciBUaW1lciA9IHJlcXVpcmUoXCIuL3RpbWVyLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFFuYSgpIHtcbiAgICAgICAgdmFyIGNvdW50ZG93biA9IG5ldyBUaW1lcigpO1xuICAgICAgICB2YXIgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8xXCI7XG4gICAgICAgIHZhciBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdFwiKTtcbiAgICAgICAgdmFyIG5leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5leHRcIik7XG4gICAgICAgIHZhciBhbnN3ZXJmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5zd2VyZmllbGRcIik7XG4gICAgICAgIHZhciBxdWVzdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXVlc3Rpb25cIik7XG4gICAgICAgIHZhciBjb250ZW50USA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dFwiKTtcbiAgICAgICAgdmFyIHRlbXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlbXBcIik7XG4gICAgICAgIHZhciBiZWdpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmVnaW5cIik7XG4gICAgICAgIHZhciBuaWNrbmFtZSA9IFwiTm8gbmlja25hbWUgZW50ZXJlZFwiO1xuICAgICAgICB2YXIgbWFpbmJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluYm9hcmRcIik7XG4gICAgICAgIHZhciBoaWdoc2NvcmVib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaHNjb3JlYm9hcmRcIik7XG5cbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24oanNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoZU9iaiA9IEpTT04ucGFyc2UoanNvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmoubmV4dFVSTCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbmJvYXJkLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoc2NvcmVib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlT2JqLnF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50US5pbm5lckhUTUwgPSBcIkdvb2Qgam9iISAtIENsaWNrIG5leHQgcXVlc3Rpb24gdG8gY29udGludWUhXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRRLmlubmVySFRNTCA9IHRoZU9iai5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmFwcGVuZENoaWxkKGNvbnRlbnRRKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZU9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmouYWx0ZXJuYXRpdmVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGFsdCBpbiB0aGVPYmouYWx0ZXJuYXRpdmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1JhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklOUFVUXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby52YWx1ZSA9IE9iamVjdC5rZXlzKHRoZU9iai5hbHRlcm5hdGl2ZXMpW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby5pZCA9IFwiYW5zd2VyZmllbGQyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKHRoZU9iai5hbHRlcm5hdGl2ZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmFkaW8ubmFtZSA9IFwiYWx0c1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGVPYmouYWx0ZXJuYXRpdmVzW2FsdF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcC5hcHBlbmRDaGlsZChuZXdSYWRpbyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyZmllbGQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5pY2tuYW1lZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5pY2tuYW1lZmllbGRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5pY2tuYW1lYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5pY2tuYW1lYm9hcmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmlja25hbWUgPSBuaWNrbmFtZWZpZWxkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lYm9hcmQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5ib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZG93bi5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRkb3duLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFucyA9IFwiU29tZXRoaW5nIHdlbnQgd3JvbmchXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU9iai5hbHRlcm5hdGl2ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPVxcXCJhbHRzXFxcIl06Y2hlY2tlZFwiKS52YWx1ZX0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFucyA9IGFuc3dlcmZpZWxkLnZhbHVlO31cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAub3BlbihcIlBPU1RcIiwgdGhlT2JqLm5leHRVUkwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHthbnN3ZXI6IGFuc30pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhbnMpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRPYmogPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAub3BlbihcIkdFVFwiLCBuZXh0T2JqLm5leHRVUkwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAuc2VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRRLmlubmVySFRNTCA9IG5leHRPYmoucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb24uYXBwZW5kQ2hpbGQoY29udGVudFEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcmZpZWxkLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuZXh0T2JqKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZG93bi5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJmaWVsZDJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0cy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGFsdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlT2JqLmFsdGVybmF0aXZlcykge2Fuc3dlcmZpZWxkLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7YW5zd2VyZmllbGQuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCJ9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG5cblxuICAgICAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHhtbGh0dHAucmVhZHlTdGF0ZSA9PT0gNCAmJiB4bWxodHRwLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soeG1saHR0cC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHhtbGh0dHAuc3RhdHVzID09PSA0MDAgfHwgeG1saHR0cC5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgICAgIG1haW5ib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb3NlcmJvYXJkXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeG1saHR0cC5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XG5cbiAgICAgICAgeG1saHR0cC5zZW5kKCk7XG4gICAgfTtcblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTYtMTItMDcuXG4gKi9cblxuLy9Vc2VkIHdpbmRvdyBjYXVzZSB0aGlzIHdhcyBjYXVzaW5nIHNvbWUgZXJyb3JzIGFuZCBidWdzLCBtYWtpbmcgdGhlIHRpbWVycyBvdmVybGFwIGVhY2hvdGhlciBhbmQgbm90IHN0b3AgcHJvcGVybHkuXG52YXIgVGltZXIgPSBmdW5jdGlvbigpIHtcbiAgICB3aW5kb3cuY2NvdW50ID0gMjA7XG59O1xuXG5UaW1lci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB3aW5kb3cuY291bnQgPSAyMDtcbiAgICBjbGVhckludGVydmFsKHdpbmRvdy5jb3VudGVyKTtcbiAgICB3aW5kb3cuY291bnRlciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cuY291bnQgPSB3aW5kb3cuY291bnQgLSAxO1xuICAgICAgICBpZiAod2luZG93LmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbmJvYXJkXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9zZXJib2FyZFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh3aW5kb3cuY291bnRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50ZG93blwiKS5pbm5lckhUTUwgPSB3aW5kb3cuY291bnQ7XG4gICAgfSwgMTAwMCk7XG59O1xuXG5UaW1lci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICBjbGVhckludGVydmFsKHdpbmRvdy5jb3VudGVyKTtcbn07XG5cblRpbWVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgIGNsZWFySW50ZXJ2YWwod2luZG93LmNvdW50ZXIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRkb3duXCIpLmlubmVySFRNTCA9IDIwO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbWVyO1xuIl19
