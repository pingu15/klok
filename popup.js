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
            setPage("HomeScreen");
            HomeScreen();
        }
    }
}

function NameScreen() {
    document.getElementById("enter1").onclick = () => {
        var name = document.getElementById("input1").value;
        addCookie("name", name);
        setPage("HomeScreen");
    }
}

function HomeScreen() {
    
}

function setPage(page) {
    document.getElementById("StartingScreen").hidden = true;
    document.getElementById("NameScreen").hidden = true;
    document.getElementById("HomeScreen").hidden = true;
    document.getElementById(page).hidden = false;
}

function getName() {
    return getCookie("name");
}
