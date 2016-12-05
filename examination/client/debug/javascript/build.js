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
                            console.log(Object.keys(theObj.alternatives).length);
                            var newList = document.createElement("LI");
                            newList.appendChild(answerfield);
                            answerfield.setAttribute("id", "answerfield");
                            answerfield.setAttribute("type", "radio");
                            answerfield.setAttribute("value", "alt1");
                            answertype.appendChild(answerfield);
                            answerfield.insertAdjacentHTML('beforeBegin', theObj.alternatives.alt1);
                        } else {

                        }

                        submit.addEventListener("click", function() {
                            try {
                                var ans = answerfield.value;
                                xmlhttp.open("POST", theObj.nextURL, true);
                                xmlhttp.setRequestHeader("Content-Type", "application/json");
                                xmlhttp.send(JSON.stringify({answer: ans}));
                                console.log(JSON.stringify(ans));

                            }
                            catch (e) {
                                contentQ.innerHTML = "Wrong answer, you lose!";
                                console.log("Swag:" + e);
                            }
                        });

                        next.addEventListener("click", function() {
                            var nextObj = JSON.parse(json);
                            xmlhttp.open("GET", nextObj.nextURL, true);
                            xmlhttp.send();
                            contentQ.innerHTML = nextObj.question;
                            question.appendChild(contentQ);
                            answerfield.value = "";
                            console.log(nextObj);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9xbmEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFFuYSA9IHJlcXVpcmUoXCIuL3FuYS5qc1wiKTtcblxubmV3IFFuYSgpO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTYtMTEtMjguXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBRbmEoKSB7XG4gICAgICAgIHZhciB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHZhciB1cmwgPSBcImh0dHA6Ly92aG9zdDMubG51LnNlOjIwMDgwL3F1ZXN0aW9uLzFcIjtcbiAgICAgICAgdmFyIHN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0XCIpO1xuICAgICAgICB2YXIgbmV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV4dFwiKTtcbiAgICAgICAgdmFyIGFuc3dlcmZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJmaWVsZFwiKTtcbiAgICAgICAgdmFyIHF1ZXN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWVzdGlvblwiKTtcbiAgICAgICAgdmFyIGNvbnRlbnRRID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0XCIpO1xuICAgICAgICB2YXIgYW5zd2VydHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5zd2VydHlwZVwiKTtcblxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihqc29uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGVPYmogPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU9iai5xdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7Y29udGVudFEuaW5uZXJIVE1MID0gXCJHb29kIGpvYiEgLSBDbGljayBuZXh0IHF1ZXN0aW9uIHRvIGNvbnRpbnVlIVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRRLmlubmVySFRNTCA9IHRoZU9iai5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGNvbnRlbnRRID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhlT2JqLnF1ZXN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmFwcGVuZENoaWxkKGNvbnRlbnRRKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZU9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmouYWx0ZXJuYXRpdmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coT2JqZWN0LmtleXModGhlT2JqLmFsdGVybmF0aXZlcykubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJMSVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdMaXN0LmFwcGVuZENoaWxkKGFuc3dlcmZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJmaWVsZC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImFuc3dlcmZpZWxkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcmZpZWxkLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyYWRpb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJmaWVsZC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBcImFsdDFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VydHlwZS5hcHBlbmRDaGlsZChhbnN3ZXJmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyZmllbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVCZWdpbicsIHRoZU9iai5hbHRlcm5hdGl2ZXMuYWx0MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFucyA9IGFuc3dlcmZpZWxkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHRoZU9iai5uZXh0VVJMLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHthbnN3ZXI6IGFuc30pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYW5zKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFEuaW5uZXJIVE1MID0gXCJXcm9uZyBhbnN3ZXIsIHlvdSBsb3NlIVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN3YWc6XCIgKyBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRPYmogPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAub3BlbihcIkdFVFwiLCBuZXh0T2JqLm5leHRVUkwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAuc2VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRRLmlubmVySFRNTCA9IG5leHRPYmoucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb24uYXBwZW5kQ2hpbGQoY29udGVudFEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcmZpZWxkLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuZXh0T2JqKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHhtbGh0dHAucmVhZHlTdGF0ZSA9PT0gNCAmJiB4bWxodHRwLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soeG1saHR0cC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHhtbGh0dHAub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuXG4gICAgICAgIHhtbGh0dHAuc2VuZCgpO1xuICAgIH07XG5cbiJdfQ==
