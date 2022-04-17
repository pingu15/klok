var timeleft = 0;
var pause = "pause";
var curTask = "";
var taskstimer = [];
var flag = false;
var tasks = []
var done = []
var timecompleted = []
var timespent = []
var runningtime = []
var curTime = 0;
var lastopened = new Date().getTime();

var douwannatest = false;

window.onload = function () {
    if(douwannatest) {
        addCookie("timespent", "3600000|203423|23897259837|18497239478231242142|2398495|234235235|253252532|325325");
        addCookie("done", "ur mom|faeiwfoawfiawfojeaiwf|dfadfa|14sdafaf|ewfawaf|feawfawf|ewfawef|efaef");
    }
    lastopened = getCookie("lastopened") == "nothin" ? new Date().getTime() : getCookie("lastopened");
    curTask = getCookie("cur") == "" ? "nothin" : getCookie("curTask");
    pause = getCookie("pause");
    done = getCookie("done") == "nothin" ? [] : getCookie("done").split("|");
    timeleft = getCookie("timer") == "nothin" ? 0 : getCookie("timer");
    runningtime = getCookie("runningtime") == "nothin" ? [] : getCookie("runningtime").split("|");
    timespent = getCookie("timespent") == "nothin" ? [] : getCookie("timespent").split("|");
    curTime = getCookie("curTime") == "nothin" ? 0 : getCookie("curTime");
    timecompleted = getCookie("timecompleted") == "nothin" ? [] : getCookie("timecompleted").split("|");
    var days = parseInt((new Date().getTime()) / 86400000);
    var lo = parseInt(lastopened / 86400000);
    if (days > lo || douwannatest) {
        setPage("Stats");
        Stats();
    } else {
        setPage("StartingScreen");
        StartingScreen();
    }
};

function updateCookies() {
    var t = "";
    for (var i = 0; i < tasks.length; i++) {
        t += tasks[i] + (i == tasks.length - 1 ? "" : "|");
    }
    addCookie("tasks", tasks.length == 0 ? "nothin" : t);
    t = "";
    for (var i = 0; i < done.length; i++) {
        t += done[i] + (i == done.length - 1 ? "" : "|");
    }
    addCookie("done", done.length == 0 ? "nothin" : t);
    addCookie("pause", pause);
    var t = "";
    for (var i = 0; i < taskstimer.length; i++) {
        t += taskstimer[i] + (i == taskstimer.length - 1 ? "" : "|");
    }
    addCookie("taskstimer", taskstimer.length == 0 ? "nothin" : t);
    addCookie("cur", curTask);
    addCookie("timer", timeleft);
    t = "";
    for (var i = 0; i < timespent.length; i++) {
        t += timespent[i] + (i == timespent.length - 1 ? "" : "|");
    }
    addCookie("timespent", timespent.length == 0 ? "nothin" : t);
    t = "";
    for (var i = 0; i < runningtime.length; i++) {
        t += runningtime[i] + (i == runningtime.length - 1 ? "" : "|");
    }
    addCookie("runningtime", runningtime.length == 0 ? "nothin" : t);
    addCookie("curTime", curTime);
    t = "";
    for (var i = 0; i < timecompleted.length; i++) {
        t += timecompleted[i] + (i == timecompleted.length - 1 ? "" : "|");
    }
    addCookie("timecompleted", timecompleted.length == 0 ? "nothin" : t);
}

function StartingScreen() {
    document.getElementById("button1").onclick = () => {
        if (getCookie("name") == "nothin") {
            setPage("NameScreen");
            NameScreen();
        } else {
            setPage("ToDo");
            ToDo();
        }
    };
}

function NameScreen() {
    document.getElementById("enter1").onclick = () => {
        var name = document.getElementById("input1").value;
        addCookie("name", name);
        setPage("ToDo");
        ToDo();
    };
}

function ToDo() {
    if (curTask == "nothin") {
        document.getElementById("taskName").innerHTML = "No Current Tasks";
        document.getElementById("timer").hidden = true;
        document.getElementById("pause").hidden = true;
        document.getElementById("checkmark").hidden = true;
    } else {
        document.getElementById("taskName").innerHTML = curTask;
        document.getElementById("timer").hidden = false;
        document.getElementById("pause").hidden = false;
        document.getElementById("checkmark").hidden = false;
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        document.getElementById("timer").innerHTML =
            (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds);
        document.getElementById("pause").innerHTML =
            pause == "pause" ? "▶" : "||";
    }
    tasks = getCookie("tasks").split("|");
    done = getCookie("done").split("|");
    if (done == "nothin") {
        done = [];
    }
    var tast = getCookie("taskstimer").split("|");
    if (tast == "nothin") {
        tast = [];
    }
    for (var i = 0; i < tast.length; i++) {
        taskstimer[i] = parseInt(tast[i]);
    }
    if (tasks == "nothin") {
        tasks = [];
        document.getElementById("hide").hidden = true;
    } else {
        document.getElementById("hide").hidden = false;
        document.getElementById("list").innerHTML = "";
        createList();
    }
    updateCookies();
    document.getElementById("pause").onclick = () => {
        if (pause == "pause") {
            pause = "start";
            makeTimer();
        } else {
            pause = "pause";
            killTimer();
        }
        updateCookies();
        document.getElementById("pause").innerHTML = pause == "pause" ? "▶" : "||";
    };
    document.getElementById("text4").onclick = () => {
        updateCookies();
        setPage("Completed");
        Completed();
    };
    document.getElementById("checkmark").onclick = () => {
        done.push(curTask);
        var h = new Date().getHours();
        var m = new Date().getMinutes();
        var s = new Date().getSeconds();
        timespent.push(curTime);
        killTimer();
        curTime = 0;
        timecompleted.push((h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s));
        curTask = "nothin";
        pause = "pause";
        timeleft = 0;
        document.getElementById("taskName").innerHTML = "No Current Tasks";
        document.getElementById("timer").hidden = true;
        document.getElementById("pause").hidden = true;
        document.getElementById("checkmark").hidden = true;
        updateCookies();
    };
    document.getElementById("addtask").onclick = () => {
        updateCookies();
        setPage("addTask");
        AddTask();
    }
}

function AddTask() {
    document.getElementById("name").value = "";
    document.getElementById("create").onclick = () => {
        tasks.push(document.getElementById("name").value);
        taskstimer.push(parseInt(parseFloat(document.getElementById("dropdown").value)*3600000));
        updateCookies();
        setPage("ToDo");
        ToDo();
    }
    document.getElementById("cancel").onclick = () => {
        setPage("ToDo");
        ToDo();
    }
}

function Completed() {
    done = getCookie("done").split("|");
    if (done == "nothin") {
        done = [];
        document.getElementById("hide2").hidden = true;
    } else {
        document.getElementById("hide2").hidden = false;
        document.getElementById("list2").innerHTML = "";
        createList2();
    }
    document.getElementById("taskscount").innerText = "You've completed " + done.length + " tasks today";
    document.getElementById("text5").onclick = () => {
        updateCookies();
        setPage("ToDo");
        ToDo();
    };
}

function setPage(page) {
    document.getElementById("StartingScreen").hidden = true;
    document.getElementById("NameScreen").hidden = true;
    document.getElementById("ToDo").hidden = true;
    document.getElementById("Completed").hidden = true;
    document.getElementById("addTask").hidden = true;
    document.getElementById("Stats").hidden = true;
    document.getElementById(page).hidden = false;
}

var f = function (i, close) {
    close[i].addEventListener("click", function () {
        flag = true;
        tasks.splice(i, 1);
        taskstimer.splice(i, 1);
        createList();
        updateCookies();
    });
};

var f3 = function (j, close) {
    close[j].addEventListener("click", function () {
        if (flag) {
            flag = false;
            return;
        }
        killTimer();
        var k = j;
        var tmp = tasks[k];
        var tmptime = taskstimer[k];
        var tmptimetaken = timespent[k];
        tasks[k] = curTask;
        taskstimer[k] = timeleft;
        curTask = tmp;
        timeleft = tmptime;
        timespent[k] = curTime;
        curTime = tmptimetaken;
        if (tasks[k] == "nothin" && taskstimer[k] == 0) {
            tasks.splice(k, 1);
            taskstimer.splice(k, 1);
        }
        document.getElementById("taskName").innerHTML = curTask;
        document.getElementById("timer").hidden = false;
        document.getElementById("pause").hidden = false;
        document.getElementById("checkmark").hidden = false;
        var h = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((timeleft % (1000 * 60)) / 1000);
        document.getElementById("timer").innerHTML = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        pause = "pause";
        document.getElementById("pause").innerHTML = pause == "pause" ? "▶" : "||";
        document.getElementById("hide").hidden = false;
        document.getElementById("list").innerHTML = "";
        createList();
        updateCookies();
    });
};

var createList = function () {
    var list = document.getElementById("list");
    document.getElementById("list").innerHTML = "";
    for (var i = 0; i < tasks.length; i++) {
        var li = document.createElement("li");
        var close = document.createElement("span");
        var task = document.createElement("div");
        var time = document.createElement("div");
        var h = Math.floor((taskstimer[i] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((taskstimer[i] % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((taskstimer[i] % (1000 * 60)) / 1000);
        time.innerText = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        time.id = "tasktimer";
        close.className = "close";
        close.innerText = "✗";
        task.innerText = tasks[i];
        task.id = "tasktext";
        li.append(task);
        li.append(close);
        li.append(time);
        li.className = "select";
        list.appendChild(li);
    }
    var close = document.getElementById("list").getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
        f(i, close);
    }
    var selected = document.getElementById("list").getElementsByClassName("select");
    for (var i = 0; i < selected.length; i++) {
        f3(i, selected);
    }
    updateCookies();
}

function createList2() {
    document.getElementById("list2").innerHTML = "";
    var list = document.getElementById("list2");
    for (var i = 0; i < done.length; i++) {
        var li = document.createElement("li");
        var ti = document.createElement("div");
        var time = document.createElement("div");
        time.innerText = timecompleted[i];
        time.id = "timecomp";
        ti.innerText = done[i];
        ti.id = "tasktext";
        li.append(ti);
        li.append(time);
        list.appendChild(li);
    }
}

function makeTimer() {
    chrome.runtime.sendMessage({ message: "start timer", tl: timeleft, ct: curTask, tt: taskstimer, t: tasks, d: done, tc: timecompleted });
}

function killTimer() {
    chrome.runtime.sendMessage({ message: "stop timer" });
}

chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message == "gimme time") {
            timeleft = request.tl;
            pause = request.p;
            timeleft = Math.max(0, timeleft);
            var hours = Math.floor(
                (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            document.getElementById("timer").innerHTML =
                (hours < 10 ? "0" + hours : hours) +
                ":" +
                (minutes < 10 ? "0" + minutes : minutes) +
                ":" +
                (seconds < 10 ? "0" + seconds : seconds);
            document.getElementById("pause").innerText = pause == "pause" ? "▶" : "||";
            updateCookies();
        }
    }
);

function Stats() {
    var tot = timespent.length;
    var graph = document.getElementById("graph");
    document.getElementById("taskscompleted").innerText = timespent.length + " tasks completed";
    for (var i = 0; i < tot; i++) {
        var bar = document.createElement("div");
        var n = document.createElement("div");
        var c = document.createElement("div");
        c.id = "cm";
        c.innerText = "✓";
        c.style.left = i * 40 + 10 + "px";
        n.id = "tname";
        n.innerText = done[i];
        n.style.left = -18 + i*40 + "px";
        bar.id = "box";
        var tmp = (8*3600000)-timespent[i];
        tmp = Math.max(tmp, 0);
        bar.style.top = 200 + (tmp*27/3600000) + "px";
        bar.style.height = 218 - (tmp*27/3600000) + "px";
        bar.style.left = i * 40 + "px";
        graph.append(bar);
        graph.append(n);
        graph.append(c);
    }
    tot = runningtime.length;
    for (var i = 0; i < tot; i++) {
        var bar = document.createElement("div");
        bar.id = "box";
        var tmp = (8*3600000)-runningtime[i];
        tmp = Math.max(tmp, 0);
        bar.style.top = 200 + (tmp*27/3600000) + "px";
        bar.style.height = 218 - (tmp*27/3600000) + "px";
        bar.style.left = i * 40 + "px";
        graph.append(bar);
    }
    document.getElementById("closebutton").onclick = () => {
        timeleft = 0;
        pause = "pause";
        curTask = "nothin";
        taskstimer = [];
        flag = false;
        tasks = []
        done = []
        timecompleted = []
        timespent = []
        done = []
        runningtime = []
        curTime = 0;
        lastopened = new Date().getTime();
        updateCookies();
        setPage("StartingScreen");
        StartingScreen();
    }
}
