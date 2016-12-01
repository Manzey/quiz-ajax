/**
 * Created by manze on 2016-11-28.
 */

module.exports = function Qna() {
        var xmlhttp = new XMLHttpRequest();
        var url = "http://vhost3.lnu.se:20080/question/1";
        var submit = document.getElementById("submit");
        var next = document.getElementById("submit");
        var answer = document.getElementById("answer");
        var answerfield = document.getElementById("answerfield");
        var question = document.getElementById("question");
        var callback = function(json) {

                        var theObj = JSON.parse(json);

                        if (theObj.id === 1) {url = "http://vhost3.lnu.se:20080/question/1"}
                        else {url = theObj.nextURL;}

                        var contentQ = document.createTextNode(theObj.question);
                        question.appendChild(contentQ);

                        console.log(theObj);

                        submit.addEventListener("click", function() {
                            var ans = answerfield.value;
                            xmlhttp.open("POST", theObj.nextURL, true);
                            xmlhttp.setRequestHeader("Content-Type", "application/json");
                            xmlhttp.send(JSON.stringify({answer: ans}));
                            console.log(JSON.stringify(ans));
                        });

                        next.addEventListener("click", function() {
                            var nextObj = JSON.parse(json);
                            url = nextObj.nextURL;
                            contentQ.innerHTML = nextObj.question;
                            console.log("test" + nextObj);

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

