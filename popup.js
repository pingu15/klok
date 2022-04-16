window.onload = function() {
    setPage("StartingScreen");
    StartingScreen();
}

function StartingScreen() {
    document.getElementById("button1").onclick = () => {
        if(getName() == "nothin") {
            setPage("NameScreen");
            NameScreen();
        } else {
            setPage("ToDo");
            ToDo();
        }
    }
}

function NameScreen() {
    document.getElementById("enter1").onclick = () => {
        var name = document.getElementById("input1").value;
        addCookie("name", name);
        setPage("ToDo");
        ToDo();
    }
}

function ToDo() {
    var tasks = getCookie("tasks").split("|");
    if(tasks == "nothin") {
        tasks = [];
    } else {
        
    }
    document.getElementById("text4").onclick = () => {
        setPage("Completed");
        removeCookie("tasks");
        var t = "";
        for(var i = 0; i < tasks.length; i++) {
            t += tasks[i]+(i == tasks.length-1 ? "" : "|");
        }
        addCookie("tasks", t);
        Completed();
    }
}

function Completed() {
    document.getElementById("text5").onclick = () => {
        setPage("ToDo");
        ToDo();
    }
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
