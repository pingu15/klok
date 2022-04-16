function addCookie(name, val) {
  var d = new Date();
  d.setTime(d.getTime() + 100000 * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + val + ";" + "expires=" + d.toUTCString() + ";path=/";
}

function removeCookie(name) {
  var d = new Date();
  d.setTime(d.getTime());
  document.cookie = name + "=;" + "expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
  var name = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "nothin";
}
