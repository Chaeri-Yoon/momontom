const body = document.querySelector('body');
const numOfBackground = 5;
const imageURLS = ["https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                "https://images.pexels.com/photos/2002719/pexels-photo-2002719.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "https://images.pexels.com/photos/4100130/pexels-photo-4100130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"];

function setBackground(){
    body.style.backgroundImage = `url(${imageURLS[getRandomNumber()]}`;
}
function getRandomNumber(){
    return Math.floor(numOfBackground * Math.random());
}

function init(){
    setBackground();
}
init();