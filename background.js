var timeleft;
var pause;
var curTask;
var int;

chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message == "start timer") {
            timeleft = request.tl;
            curTask = request.ct;
            pause = "start";
            int = setInterval(timerFunc, 1000);
        }
    }
);

function timerFunc() {
    if (pause == "start") {
        if (timeleft == 0) {
            alert("Hey " + getCookie("name") + " Times up! Take break. Your timer has been stopped.");
            pause = "pause";
            updateCookies();
            chrome.runtime.sendMessage({ message: "gimme time", tl: timeleft, p: pause});
            return;
        }
        timeleft -= 1000;
        curTime += 1000;
        timeleft = Math.max(0, timeleft);
        chrome.runtime.sendMessage({ message: "gimme time", tl: timeleft, p: pause});
    }
    return;
}

chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message == "stop timer") {
            pause = "pause";
            timeleft = 0;
            clearInterval(int);
        }
    }
);