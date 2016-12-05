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

