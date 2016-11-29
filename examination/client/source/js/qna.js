/**
 * Created by manze on 2016-11-28.
 */

module.exports = function Qna() {
    var question = document.getElementById("question");
    var answer = document.getElementById("answer");

    htmlQna({method: "get", url: "http://vhost3.lnu.se:20080/question/1"}, function(error, response) {
        if (error) {
            throw new Error("Network error " + error)
        }

        console.log(response);
        //CONTINUE TRYING TO RETURN THE VALUES
    });

    var contentQ = document.createTextNode(this.test);
    var contentA = document.createTextNode("TestA");
    question.appendChild(contentQ);
    answer.appendChild(contentA);
};

function htmlQna(config, callback) {
    var req = new XMLHttpRequest();
    req.addEventListener("load", function() {
        if (req.status >= 400) {
            callback(req.status);
        }

        callback(null, req.responseText);
    });

    req.open(config.method, config.url);
    req.send();
}


