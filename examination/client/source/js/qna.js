/**
 * Created by manze on 2016-11-28.
 */

module.exports = function Qna() {
        var xmlhttp;
        var url = "http://vhost3.lnu.se:20080/question/1";
        var submit = document.getElementById("submit");
        var answer = document.getElementById("answer");
        var callback = function(json) {
                    var theObj = JSON.parse(json);
                    var question = document.getElementById("question");
                    var contentQ = document.createTextNode(theObj.question);
                    //var contentA = document.createTextNode("TestA");
                    question.appendChild(contentQ);
                    //answer.appendChild(contentA);
                    submit.addEventListener("click", function() {
                        var answer = "two";
                        xmlhttp.open("POST", theObj.nextURL, true);
                        xmlhttp.send(JSON.stringify(answer));
                    })
                };



        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                callback(xmlhttp.responseText);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        //}
    };

