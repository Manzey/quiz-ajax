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
        var temp = document.getElementById("temp");

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
                                temp.appendChild(value);
                                temp.appendChild(newRadio);

                                answerfield.style.display = "none";}

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
    };


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9xbmEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBRbmEgPSByZXF1aXJlKFwiLi9xbmEuanNcIik7XG5cbm5ldyBRbmEoKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYW56ZSBvbiAyMDE2LTExLTI4LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUW5hKCkge1xuICAgICAgICB2YXIgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgdXJsID0gXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8xXCI7XG4gICAgICAgIHZhciBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdFwiKTtcbiAgICAgICAgdmFyIG5leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5leHRcIik7XG4gICAgICAgIHZhciBhbnN3ZXJmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5zd2VyZmllbGRcIik7XG4gICAgICAgIHZhciBxdWVzdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXVlc3Rpb25cIik7XG4gICAgICAgIHZhciBjb250ZW50USA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dFwiKTtcbiAgICAgICAgdmFyIGFuc3dlcnR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuc3dlcnR5cGVcIik7XG4gICAgICAgIHZhciBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJ0eXBlXCIpO1xuICAgICAgICB2YXIgdGVtcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcFwiKTtcblxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihqc29uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGVPYmogPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU9iai5xdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7Y29udGVudFEuaW5uZXJIVE1MID0gXCJHb29kIGpvYiEgLSBDbGljayBuZXh0IHF1ZXN0aW9uIHRvIGNvbnRpbnVlIVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRRLmlubmVySFRNTCA9IHRoZU9iai5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGNvbnRlbnRRID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhlT2JqLnF1ZXN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmFwcGVuZENoaWxkKGNvbnRlbnRRKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoZU9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmouYWx0ZXJuYXRpdmVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGFsdCBpbiB0aGVPYmouYWx0ZXJuYXRpdmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1JhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklOUFVUXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby52YWx1ZSA9IE9iamVjdC5rZXlzKHRoZU9iai5hbHRlcm5hdGl2ZXMpW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSYWRpby5pZCA9IFwiYW5zd2VyZmllbGQyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKHRoZU9iai5hbHRlcm5hdGl2ZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmFkaW8ubmFtZSA9IFwiYWx0c1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGVPYmouYWx0ZXJuYXRpdmVzW2FsdF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcC5hcHBlbmRDaGlsZChuZXdSYWRpbyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyZmllbGQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO31cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbnMgPSBcIlNvbWV0aGluZyB3ZW50IHdyb25nIVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVPYmouYWx0ZXJuYXRpdmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT1cXFwiYWx0c1xcXCJdOmNoZWNrZWRcIikudmFsdWV9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnMgPSBhbnN3ZXJmaWVsZC52YWx1ZTt9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHRoZU9iai5uZXh0VVJMLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeSh7YW5zd2VyOiBhbnN9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYW5zKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50US5pbm5lckhUTUwgPSBcIldyb25nIGFuc3dlciwgeW91IGxvc2UhXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRPYmogPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAub3BlbihcIkdFVFwiLCBuZXh0T2JqLm5leHRVUkwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbGh0dHAuc2VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRRLmlubmVySFRNTCA9IG5leHRPYmoucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb24uYXBwZW5kQ2hpbGQoY29udGVudFEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcmZpZWxkLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuZXh0T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5zd2VyZmllbGQyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdHMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhbHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU9iai5hbHRlcm5hdGl2ZXMpIHthbnN3ZXJmaWVsZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge2Fuc3dlcmZpZWxkLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwifVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHhtbGh0dHAucmVhZHlTdGF0ZSA9PT0gNCAmJiB4bWxodHRwLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soeG1saHR0cC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHhtbGh0dHAub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuXG4gICAgICAgIHhtbGh0dHAuc2VuZCgpO1xuICAgIH07XG5cbiJdfQ==
