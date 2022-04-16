var rem = [];
var timeleft = -1;
var pause = "pause";
var curTask = "";
var taskstimer = [];

window.onload = function () {
  addCookie(
    "tasks",
    "annagfawfewfawfawfewafwafwafewafwafwaie|zoe|shiv|max|annie|zoe|shiv|max|monke"
  );
  addCookie(
    "taskstimer",
    "5000|2000|50000|30000|30000|30000|30000|30000|30000"
  );
  pause = getCookie("pause");
  timeleft = getCookie("timer") == "nothin" ? -1 : getCookie("timer");
  setPage("StartingScreen");
  StartingScreen();
};

window.onclose = function () {
  if (timeleft != -1) {
    removeCookie("timer");
    addCookie("timer", timeleft);
  }
};

function StartingScreen() {
  document.getElementById("button1").onclick = () => {
    if (getName() == "nothin") {
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
  curTask = getCookie("curTask");
  if (curTask == "nothin") {
    document.getElementById("taskName").innerHTML = "No Current Tasks";
    document.getElementById("timer").hidden = true;
    document.getElementById("pause").hidden = true;
  } else {
    document.getElementById("taskName").innerHTML = curTask;
    document.getElementById("timer").hidden = false;
    document.getElementById("pause").hidden = false;
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
    document.getElementById("pause").innerHTML =
      getCookie("pause") == "pause" ? "▶" : "||";
  }
  var tasks = getCookie("tasks").split("|");
  var done = getCookie("done").split("|");
  var tast = getCookie("taskstimer").split("|");
  for (var i = 0; i < tast.length; i++) {
    taskstimer[i] = parseInt(tast[i]);
  }
  if (tasks == "nothin") {
    tasks = [];
    document.getElementById("hide").hidden = true;
  } else {
    document.getElementById("hide").hidden = false;
    document.getElementById("list").innerHTML = "";
    var list = document.getElementById("list");
    for (var i = 0; i < tasks.length; i++) {
      var li = document.createElement("li");
      var cl = document.createElement("span");
      var ti = document.createElement("div");
      var tim = document.createElement("div");
      tim.id = "tasktimer";
      var hours = Math.floor(
        (taskstimer[i] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor(
        (taskstimer[i] % (1000 * 60 * 60)) / (1000 * 60)
      );
      var seconds = Math.floor((taskstimer[i] % (1000 * 60)) / 1000);
      tim.innerText =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);
      cl.className = "close";
      cl.innerText = "×";
      ti.innerText = tasks[i];
      ti.id = "tasktext";
      li.append(ti);
      li.append(cl);
      li.append(tim);
      li.className = "select";
      list.appendChild(li);
    }
  }
  if (done == "nothin") {
    done = [];
  }
  var close = [];
  var temp = document.getElementById("list").getElementsByClassName("close");
  for (var i = 0; i < temp.length; i++) {
    close[i] = temp[i];
  }
  rem = [];
  for (var j = 0; j < close.length; j++) {
    rem[j] = 0;
  }
  for (var j = 0; j < close.length; j++) {
    f(j, tasks, done, close);
  }
  var selected = [];
  var tt = document.getElementById("list").getElementsByClassName("select");
  for (var i = 0; i < tt.length; i++) {
    selected[i] = tt[i];
  }
  for (var i = 0; i < tt.length; i++) {
    f3(i, tasks, selected);
  }
  document.getElementById("pause").onclick = () => {
    if (pause == "pause") {
      pause = "start";
    } else {
      pause = "pause";
    }
    document.getElementById("pause").innerHTML = pause == "pause" ? "▶" : "||";
  };
  document.getElementById("text4").onclick = () => {
    setPage("Completed");
    removeCookie("tasks");
    if (tasks.length != 0) {
      var t = "";
      for (var i = 0; i < tasks.length; i++) {
        t += tasks[i] + (i == tasks.length - 1 ? "" : "|");
      }
      addCookie("tasks", t);
    }
    removeCookie("done");
    if (done.length != 0) {
      t = "";
      for (var i = 0; i < done.length; i++) {
        t += done[i] + (i == done.length - 1 ? "" : "|");
      }
      addCookie("done", t);
    }
    removeCookie("pause");
    addCookie("pause", pause);
    Completed();
  };
}

function Completed() {
  var done = getCookie("done").split("|");
  if (done == "nothin") {
    done = [];
    document.getElementById("hide2").hidden = true;
  } else {
    document.getElementById("hide2").hidden = false;
    document.getElementById("list2").innerHTML = "";
    var list = document.getElementById("list2");
    for (var i = 0; i < done.length; i++) {
      var li = document.createElement("li");
      var cl = document.createElement("span");
      var ti = document.createElement("div");
      cl.className = "close";
      cl.innerText = "×";
      ti.innerText = done[i];
      ti.id = "tasktext";
      li.append(ti);
      li.append(cl);
      list.appendChild(li);
    }
  }
  var close = [];
  var temp = document.getElementById("list2").getElementsByClassName("close");
  for (var i = 0; i < temp.length; i++) {
    close[i] = temp[i];
  }
  rem = [];
  for (var j = 0; j < close.length; j++) {
    rem[j] = 0;
  }
  for (var j = 0; j < close.length; j++) {
    f2(j, done, close);
  }
  document.getElementById("text5").onclick = () => {
    setPage("ToDo");
    removeCookie("done");
    if (done.length != 0) {
      t = "";
      for (var i = 0; i < done.length; i++) {
        t += done[i] + (i == done.length - 1 ? "" : "|");
      }
      addCookie("done", t);
    }
    ToDo();
  };
}

function setPage(page) {
  document.getElementById("StartingScreen").hidden = true;
  document.getElementById("NameScreen").hidden = true;
  document.getElementById("ToDo").hidden = true;
  document.getElementById("Completed").hidden = true;
  document.getElementById(page).hidden = false;
}

function getName() {
  return getCookie("name");
}

var f = function (i, tasks, done, close) {
  close[i].addEventListener("click", function () {
    done.push(tasks[i - rem[i]]);
    tasks.splice(i - rem[i], 1);
    close.splice(i - rem[i], 1);
    this.parentElement.style.display = "none";
    for (var j = i; j < rem.length; j++) {
      rem[j]++;
    }
  });
};

var f2 = function (i, done, close) {
  close[i].addEventListener("click", function () {
    done.splice(i - rem[i], 1);
    close.splice(i - rem[i], 1);
    this.parentElement.style.display = "none";
    for (var j = i; j < rem.length; j++) {
      rem[j]++;
    }
  });
};

var f3 = function (j, tasks, close) {
  close[j].addEventListener("click", function () {
    var tmp = tasks[j];
    var tmptime = taskstimer[j];
    tasks[j] = curTask;
    taskstimer[j] = timeleft;
    curTask = tmp;
    timeleft = tmptime;
    document.getElementById("taskName").innerHTML = curTask;
    document.getElementById("timer").hidden = false;
    document.getElementById("pause").hidden = false;
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
    pause = "pause";
    document.getElementById("pause").innerHTML = pause == "pause" ? "▶" : "||";
    document.getElementById("hide").hidden = false;
    document.getElementById("list").innerHTML = "";
    var list = document.getElementById("list");
    for (var i = 0; i < tasks.length; i++) {
      var li = document.createElement("li");
      var cl = document.createElement("span");
      var ti = document.createElement("div");
      var tim = document.createElement("div");
      tim.id = "tasktimer";
      var hours = Math.floor(
        (taskstimer[i] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor(
        (taskstimer[i] % (1000 * 60 * 60)) / (1000 * 60)
      );
      var seconds = Math.floor((taskstimer[i] % (1000 * 60)) / 1000);
      tim.innerText =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);
      cl.className = "close";
      cl.innerText = "×";
      ti.innerText = tasks[i];
      ti.id = "tasktext";
      li.append(ti);
      li.append(cl);
      li.append(tim);
      li.className = "select";
      list.appendChild(li);
    }
    var selected = [];
    var tt = document.getElementById("list").getElementsByClassName("select");
    for (var i = 0; i < tt.length; i++) {
      selected[i] = tt[i];
    }
    for (var i = 0; i < tt.length; i++) {
      f3(i, tasks, selected);
    }
  });
};

var timerFunc = setInterval(function () {
  if (pause == "start") {
    if (timeleft == 0) {
      alert("times up bitch");
      pause = "pause";
    }
    timeleft -= 1000;
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
    document.getElementById("pause").innerHTML = pause == "pause" ? "▶" : "||";
  }
}, 1000);
