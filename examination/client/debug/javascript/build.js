(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Qna = require("./qna.js");

new Qna();

},{"./qna.js":2}],2:[function(require,module,exports){
/**
 * Created by manze on 2016-11-28.
 */

module.exports = function Qna() {
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
                            countdown();
                        });

                        submit.addEventListener("click", function() {
                            var ans = "Something went wrong!";
                            if (theObj.alternatives)
                            {ans = document.querySelector("input[name=\"alts\"]:checked").value} else {
                                ans = answerfield.value;}

                            xmlhttp.open("POST", theObj.nextURL, true);
                            xmlhttp.setRequestHeader("Content-Type", "application/json");
                            xmlhttp.send(JSON.stringify({answer: ans}));
                            console.log(JSON.stringify(ans));

                            contentQ.innerHTML = "Wrong answer, you lose!";
                        });

                        next.addEventListener("click", function() {
                            var nextObj = JSON.parse(json);
                            xmlhttp.open("GET", nextObj.nextURL, true);
                            xmlhttp.send();
                            contentQ.innerHTML = nextObj.question;
                            question.appendChild(contentQ);
                            answerfield.value = "";
                            console.log(nextObj);

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
        };

        xmlhttp.open("GET", url, true);

        xmlhttp.send();


    //Found a simple timer
        var seconds;
        var temp1;
        function countdown() {

            seconds = document.getElementById("countdown").innerHTML;
            seconds = parseInt(seconds, 10);

            if (seconds === 1) {
                temp1 = document.getElementById("countdown");
                temp1.innerHTML = "0";
                return;
            }

            seconds -= 1;
            temp1 = document.getElementById("countdown");
            temp1.innerHTML = seconds;
            timeoutMyOswego = setTimeout(countdown, 1000);
        }

    };


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9xbmEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUW5hID0gcmVxdWlyZShcIi4vcW5hLmpzXCIpO1xuXG5uZXcgUW5hKCk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFuemUgb24gMjAxNi0xMS0yOC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFFuYSgpIHtcbiAgICAgICAgdmFyIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgdmFyIHVybCA9IFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMVwiO1xuICAgICAgICB2YXIgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRcIik7XG4gICAgICAgIHZhciBuZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXh0XCIpO1xuICAgICAgICB2YXIgYW5zd2VyZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuc3dlcmZpZWxkXCIpO1xuICAgICAgICB2YXIgcXVlc3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1ZXN0aW9uXCIpO1xuICAgICAgICB2YXIgY29udGVudFEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHRcIik7XG4gICAgICAgIHZhciB0ZW1wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wXCIpO1xuICAgICAgICB2YXIgYmVnaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJlZ2luXCIpO1xuICAgICAgICB2YXIgbmlja25hbWUgPSBcIk5vIG5pY2tuYW1lIGVudGVyZWRcIjtcbiAgICAgICAgdmFyIG1haW5ib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbmJvYXJkXCIpO1xuICAgICAgICB2YXIgaGlnaHNjb3JlYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZ2hzY29yZWJvYXJkXCIpO1xuXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKGpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGVPYmogPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlT2JqLm5leHRVUkwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5ib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaHNjb3JlYm9hcmQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU9iai5xdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFEuaW5uZXJIVE1MID0gXCJHb29kIGpvYiEgLSBDbGljayBuZXh0IHF1ZXN0aW9uIHRvIGNvbnRpbnVlIVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50US5pbm5lckhUTUwgPSB0aGVPYmoucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmFwcGVuZENoaWxkKGNvbnRlbnRRKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZU9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmouYWx0ZXJuYXRpdmVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGFsdCBpbiB0aGVPYmouYWx0ZXJuYXRpdmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1JhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklOUFVUXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby52YWx1ZSA9IE9iamVjdC5rZXlzKHRoZU9iai5hbHRlcm5hdGl2ZXMpW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby5pZCA9IFwiYW5zd2VyZmllbGQyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKHRoZU9iai5hbHRlcm5hdGl2ZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmFkaW8ubmFtZSA9IFwiYWx0c1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGVPYmouYWx0ZXJuYXRpdmVzW2FsdF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcC5hcHBlbmRDaGlsZChuZXdSYWRpbyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyZmllbGQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5pY2tuYW1lZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5pY2tuYW1lZmllbGRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5pY2tuYW1lYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5pY2tuYW1lYm9hcmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmlja25hbWUgPSBuaWNrbmFtZWZpZWxkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lYm9hcmQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5ib2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZG93bigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFucyA9IFwiU29tZXRoaW5nIHdlbnQgd3JvbmchXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU9iai5hbHRlcm5hdGl2ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPVxcXCJhbHRzXFxcIl06Y2hlY2tlZFwiKS52YWx1ZX0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFucyA9IGFuc3dlcmZpZWxkLnZhbHVlO31cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAub3BlbihcIlBPU1RcIiwgdGhlT2JqLm5leHRVUkwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHthbnN3ZXI6IGFuc30pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhbnMpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRRLmlubmVySFRNTCA9IFwiV3JvbmcgYW5zd2VyLCB5b3UgbG9zZSFcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dE9iaiA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1saHR0cC5vcGVuKFwiR0VUXCIsIG5leHRPYmoubmV4dFVSTCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1saHR0cC5zZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFEuaW5uZXJIVE1MID0gbmV4dE9iai5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbi5hcHBlbmRDaGlsZChjb250ZW50USk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyZmllbGQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5leHRPYmopO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFsdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuc3dlcmZpZWxkMlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYWx0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmouYWx0ZXJuYXRpdmVzKSB7YW5zd2VyZmllbGQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHthbnN3ZXJmaWVsZC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh4bWxodHRwLnJlYWR5U3RhdGUgPT09IDQgJiYgeG1saHR0cC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhtbGh0dHAucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB4bWxodHRwLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcblxuICAgICAgICB4bWxodHRwLnNlbmQoKTtcblxuXG4gICAgLy9Gb3VuZCBhIHNpbXBsZSB0aW1lclxuICAgICAgICB2YXIgc2Vjb25kcztcbiAgICAgICAgdmFyIHRlbXAxO1xuICAgICAgICBmdW5jdGlvbiBjb3VudGRvd24oKSB7XG5cbiAgICAgICAgICAgIHNlY29uZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50ZG93blwiKS5pbm5lckhUTUw7XG4gICAgICAgICAgICBzZWNvbmRzID0gcGFyc2VJbnQoc2Vjb25kcywgMTApO1xuXG4gICAgICAgICAgICBpZiAoc2Vjb25kcyA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRlbXAxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3VudGRvd25cIik7XG4gICAgICAgICAgICAgICAgdGVtcDEuaW5uZXJIVE1MID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWNvbmRzIC09IDE7XG4gICAgICAgICAgICB0ZW1wMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY291bnRkb3duXCIpO1xuICAgICAgICAgICAgdGVtcDEuaW5uZXJIVE1MID0gc2Vjb25kcztcbiAgICAgICAgICAgIHRpbWVvdXRNeU9zd2VnbyA9IHNldFRpbWVvdXQoY291bnRkb3duLCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuIl19
