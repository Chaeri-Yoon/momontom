const clock = document.querySelector('.jsClock');

function displayTime(){
    const date = new Date();
    let hour = (date.getHours() + 9);

    if(hour < 10)   hour = "0" + hour.toString();
    else{
        if(hour >= 24)  hour = (hour - 24) < 10 ? "0" + (hour - 24).toString() : hour - 24;
    }

    const minute = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes();
    const second = date.getSeconds() < 10 ? "0" + date.getSeconds().toString() : date.getSeconds();

    clock.innerText = `${hour}:${minute}:${second}`;
}
function init(){
    displayTime();
    setInterval(displayTime, 1000);
}
init();