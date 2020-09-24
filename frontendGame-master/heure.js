
function printTime(){
    var d = new Date();
    var hours = d.getHours();
    var mins = d.getMinutes();
    var secs = d.getSeconds();
    document.getElementById("horloge").textContent = hours+":"+mins+`:${secs < 10 ? "0" : ""}`+secs;
}

setInterval(printTime, 1000);