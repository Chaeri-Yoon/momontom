const body = document.querySelector('body');
const numOfBackground = 5;

function setBackground(){
    const image = new Image();
    image.src = `/background_images/${getRandomNumber()}.jpg`;    
    image.classList.add('background__image');
    body.appendChild(image);
}
function getRandomNumber(){
    return Math.floor(numOfBackground * Math.random());
}

function init(){
    setBackground();
}
init();