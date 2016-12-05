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
        var answertype = document.getElementById("answertype");
        var form = document.getElementById("answertype");

        var callback = function(json) {

                        var theObj = JSON.parse(json);
                        if (theObj.question === undefined) {contentQ.innerHTML = "Good job! - Click next question to continue!"
                        } else {
                            contentQ.innerHTML = theObj.question;
                        }
                        //var contentQ = document.createTextNode(theObj.question);
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
                                form.appendChild(value);
                                form.appendChild(newRadio);

                                answerfield.style.display = "none"; }

                        }

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
    };


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9xbmEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUW5hID0gcmVxdWlyZShcIi4vcW5hLmpzXCIpO1xuXG5uZXcgUW5hKCk7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFuemUgb24gMjAxNi0xMS0yOC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFFuYSgpIHtcbiAgICAgICAgdmFyIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgdmFyIHVybCA9IFwiaHR0cDovL3Zob3N0My5sbnUuc2U6MjAwODAvcXVlc3Rpb24vMVwiO1xuICAgICAgICB2YXIgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRcIik7XG4gICAgICAgIHZhciBuZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXh0XCIpO1xuICAgICAgICB2YXIgYW5zd2VyZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuc3dlcmZpZWxkXCIpO1xuICAgICAgICB2YXIgcXVlc3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF1ZXN0aW9uXCIpO1xuICAgICAgICB2YXIgY29udGVudFEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHRcIik7XG4gICAgICAgIHZhciBhbnN3ZXJ0eXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJ0eXBlXCIpO1xuICAgICAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5zd2VydHlwZVwiKTtcblxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihqc29uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGVPYmogPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU9iai5xdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7Y29udGVudFEuaW5uZXJIVE1MID0gXCJHb29kIGpvYiEgLSBDbGljayBuZXh0IHF1ZXN0aW9uIHRvIGNvbnRpbnVlIVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRRLmlubmVySFRNTCA9IHRoZU9iai5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGNvbnRlbnRRID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhlT2JqLnF1ZXN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmFwcGVuZENoaWxkKGNvbnRlbnRRKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZU9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmouYWx0ZXJuYXRpdmVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGFsdCBpbiB0aGVPYmouYWx0ZXJuYXRpdmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1JhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklOUFVUXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby52YWx1ZSA9IE9iamVjdC5rZXlzKHRoZU9iai5hbHRlcm5hdGl2ZXMpW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby5pZCA9IFwiYW5zd2VyZmllbGQyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKHRoZU9iai5hbHRlcm5hdGl2ZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmFkaW8ubmFtZSA9IFwiYWx0c1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGVPYmouYWx0ZXJuYXRpdmVzW2FsdF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChuZXdSYWRpbyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyZmllbGQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYW5zID0gXCJTb21ldGhpbmcgd2VudCB3cm9uZyFcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlT2JqLmFsdGVybmF0aXZlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9XFxcImFsdHNcXFwiXTpjaGVja2VkXCIpLnZhbHVlfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5zID0gYW5zd2VyZmllbGQudmFsdWU7fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1saHR0cC5vcGVuKFwiUE9TVFwiLCB0aGVPYmoubmV4dFVSTCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkoe2Fuc3dlcjogYW5zfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFucykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFEuaW5uZXJIVE1MID0gXCJXcm9uZyBhbnN3ZXIsIHlvdSBsb3NlIVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0T2JqID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLm9wZW4oXCJHRVRcIiwgbmV4dE9iai5uZXh0VVJMLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLnNlbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50US5pbm5lckhUTUwgPSBuZXh0T2JqLnF1ZXN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmFwcGVuZENoaWxkKGNvbnRlbnRRKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJmaWVsZC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobmV4dE9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFsdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuc3dlcmZpZWxkMlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYWx0cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlT2JqLmFsdGVybmF0aXZlcykge2Fuc3dlcmZpZWxkLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7YW5zd2VyZmllbGQuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgIHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoeG1saHR0cC5yZWFkeVN0YXRlID09PSA0ICYmIHhtbGh0dHAuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh4bWxodHRwLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeG1saHR0cC5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XG5cbiAgICAgICAgeG1saHR0cC5zZW5kKCk7XG4gICAgfTtcblxuIl19
