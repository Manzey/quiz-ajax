/**
 * Created by manze on 2016-11-28.
 */

module.exports = function Qna() {
    var question = document.getElementById("question");
    var answer = document.getElementById("answer");
    var contentQ = document.createTextNode("Test");
    var contentA = document.createTextNode("TestA");
    question.appendChild(contentQ);
    answer.appendChild(contentA);
};
