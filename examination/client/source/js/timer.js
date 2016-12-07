/**
 * Created by manze on 2016-12-07.
 */

module.exports = function Timer() {
    this.seconds = 0;
    this.temp = 0;

};

Timer.prototype.countdown = function() {
    this.seconds = document.getElementById('countdown').innerHTML;
    this.seconds = parseInt(this.seconds, 10);

    if (this.seconds == 1) {
        this.temp = document.getElementById('countdown');
        this.temp.innerHTML = "all done, bye bye";
        return;
    }

    this.seconds--;
    this.temp = document.getElementById('countdown');
    this.temp.innerHTML = this.seconds;
    timeoutMyOswego = setTimeout(countdown, 1000);
};
