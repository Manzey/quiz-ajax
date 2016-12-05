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

