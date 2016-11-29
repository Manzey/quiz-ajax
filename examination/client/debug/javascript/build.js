(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Qna = require("./qna.js");

new Qna();

},{"./qna.js":2}],2:[function(require,module,exports){
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



},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMi4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9xbmEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFFuYSA9IHJlcXVpcmUoXCIuL3FuYS5qc1wiKTtcblxubmV3IFFuYSgpO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTYtMTEtMjguXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBRbmEoKSB7XG4gICAgdmFyIHF1ZXN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxdWVzdGlvblwiKTtcbiAgICB2YXIgYW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnN3ZXJcIik7XG5cbiAgICBodG1sUW5hKHttZXRob2Q6IFwiZ2V0XCIsIHVybDogXCJodHRwOi8vdmhvc3QzLmxudS5zZToyMDA4MC9xdWVzdGlvbi8xXCJ9LCBmdW5jdGlvbihlcnJvciwgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZXR3b3JrIGVycm9yIFwiICsgZXJyb3IpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgIC8vQ09OVElOVUUgVFJZSU5HIFRPIFJFVFVSTiBUSEUgVkFMVUVTXG4gICAgfSk7XG5cbiAgICB2YXIgY29udGVudFEgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLnRlc3QpO1xuICAgIHZhciBjb250ZW50QSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiVGVzdEFcIik7XG4gICAgcXVlc3Rpb24uYXBwZW5kQ2hpbGQoY29udGVudFEpO1xuICAgIGFuc3dlci5hcHBlbmRDaGlsZChjb250ZW50QSk7XG59O1xuXG5mdW5jdGlvbiBodG1sUW5hKGNvbmZpZywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVxLnN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlcS5zdGF0dXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgfSk7XG5cbiAgICByZXEub3Blbihjb25maWcubWV0aG9kLCBjb25maWcudXJsKTtcbiAgICByZXEuc2VuZCgpO1xufVxuXG5cbiJdfQ==
