const greetingMessage = document.querySelector('.jsGreetingMessage');
const userNameForm = document.querySelector('.jsEnterUserNameForm');
const enteredUserName = document.querySelector('.jsEnteredUserName');

const userNameBlank = document.querySelector('.jsUserName');

function displayGreetingMessage(){
    greetingMessage.style.display = "flex";
    userNameForm.style.display = "none";
}

function displayEnterUserName(){
    greetingMessage.style.display = "none";
    userNameForm.style.display = "flex";
}
function setUserName(event){
    event.preventDefault();
    
    localStorage.setItem('userName', enteredUserName.value);
    displayUserName(enteredUserName.value);
    displayGreetingMessage();

    enteredUserName.value = "";
}
function displayUserName(_name){
    userNameBlank.innerText = _name;
}
function init(){
    if(userNameForm != null)   userNameForm.addEventListener('submit', setUserName);
    
    const loadedUserName = localStorage.getItem('userName');
    if(loadedUserName != null)  {
        displayGreetingMessage();
        displayUserName(loadedUserName);
    }
    else displayEnterUserName();
}
init();
