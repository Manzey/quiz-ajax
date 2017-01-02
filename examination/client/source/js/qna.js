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

