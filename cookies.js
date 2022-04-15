function addCookie(name, val) {
    document.cookie = name+"="+val+";";
}

function getCookie(name) {
    var cookies = document.cookie.split("; ");
    for(let i = 0; i < cookies.length; i++) {
        if(cookies[i].split("=")[0] == name) {
            return cookies[i].split("=")[1];
        }
    }
    return "bro????????????????????";
}