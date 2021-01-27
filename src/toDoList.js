const toDoForm = document.querySelector('.jsToDoForm');
const enterSpace = document.querySelector('.jsEnterSpace');
const toDo = document.querySelector('.jsToDoList');
const done = document.querySelector('.jsDoneList');

const UNDONE = "undone";
const DONE = "done";
const UNDONEBUTTON = "fa-square";
const DONEBUTTON = "fa-check-square";

let lastToDoNum = 0;
let lastDoneNum = 0;

let toDoTasks = [];
let doneTasks = [];

function resetToDoList(){
    toDoTasks.length = 0;
    lastToDoNum = 0;

    doneTasks.length = 0;
    lastDoneNum = 0;

    if(toDo.childNodes != null) toDo.childNodes.forEach((li) => toDo.removeChild(li));
    if(done.childNodes != null) done.childNodes.forEach((li) => done.removeChild(li));

    while (toDo.firstChild) {
        toDo.removeChild(toDo.firstChild);
    }
    while (done.firstChild) {
        done.removeChild(done.firstChild);
    }

    loadData();
}
function loadData(){
    let loadedToDoData = localStorage.getItem([displayDate] + "__" + [UNDONE]);

    if(loadedToDoData != null){
        loadedToDoData = JSON.parse(loadedToDoData);
        loadedToDoData.forEach((task) => addTask(task["task"], true));
    }

    let loadedDoneData = localStorage.getItem([displayDate] + "__" + [DONE]);
    if(loadedDoneData != null){
        loadedDoneData = JSON.parse(loadedDoneData);
        loadedDoneData.forEach((task) => addTask(task["task"], false));
    }
}
function onTaskEntered(event){
    addTask(enterSpace.value, true);
    enterSpace.value = "";
}
function addTask(_task, _isUnDone){
    const li = document.createElement('li');
    const checkButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const i = document.createElement('i');
    const span = document.createElement('span');

    span.innerText = _task;
    i.classList.add('far');
    i.classList.add(_isUnDone ? UNDONEBUTTON : DONEBUTTON);
    i.classList.add('fa-lg');
    i.addEventListener('click', checkIfDone);

    deleteButton.innerText = "❌"
    deleteButton.classList.add('btn__delete');
    deleteButton.addEventListener('click', deleteTask);

    checkButton.appendChild(i);
    li.id = _isUnDone ? (lastToDoNum)++ + 1 : (lastDoneNum)++ + 1;
    li.classList.add(_isUnDone ? UNDONE : DONE);
    li.appendChild(checkButton);
    li.appendChild(span);
    li.appendChild(deleteButton);

    if(_isUnDone)   toDo.appendChild(li);
    else done.appendChild(li);

    addData(_task, _isUnDone);
}
function checkIfDone(event){
    const clickedButton = event.target;
    const selectedTodo = event.target.parentNode.parentNode;
    if(selectedTodo.classList.contains(UNDONE)){
        clickedButton.classList.remove(UNDONEBUTTON);
        clickedButton.classList.add(DONEBUTTON);

        selectedTodo.classList.remove(UNDONE);
        selectedTodo.classList.add(DONE);

        moveToDoneTasks(event);
    }
    else{
        clickedButton.classList.remove(DONEBUTTON);
        clickedButton.classList.add(UNDONEBUTTON);

        selectedTodo.classList.remove(DONE);
        selectedTodo.classList.add(UNDONE);

        moveToToDoTasks(event);
    }
}
function moveToDoneTasks(event){
    const text = event.target.parentNode.parentNode.childNodes[1].innerText;
    removeData(event.target.parentNode.parentNode, true);
    
    event.target.parentNode.parentNode.id = (lastDoneNum)++ + 1;
    done.appendChild(event.target.parentNode.parentNode);
    addData(text, false);
}
function moveToToDoTasks(event){
    const text = event.target.parentNode.parentNode.childNodes[1].innerText;
    removeData(event.target.parentNode.parentNode, false);

    event.target.parentNode.parentNode.id = (lastToDoNum)++ + 1;
    toDo.appendChild(event.target.parentNode.parentNode);
    addData(text, true);
}
function addData(task, isUnDone){
    let array = isUnDone ? toDoTasks : doneTasks;
    const num = isUnDone ? lastToDoNum: lastDoneNum;
    const taskObj = {
        id : num,
        task: task
    }
    array.push(taskObj);

    if(isUnDone) toDoTasks = array;
    else doneTasks = array;

    if(toDoTasks.length != 0){
        const toDoData = JSON.stringify(toDoTasks);
        localStorage.setItem([displayDate] + "__" + [UNDONE], toDoData);
    }
    if(doneTasks.length != 0){
        const doneData = JSON.stringify(doneTasks);
        localStorage.setItem([displayDate] + "__" + [DONE], doneData);
    }
}
function removeData(_item, _isUnDone){
    let array = _isUnDone ? toDoTasks : doneTasks;
    const cleanArray = array.filter(function(task) {
        return task.id !== parseInt(_item.id);
    });
    array = cleanArray;

    if(_isUnDone) toDoTasks = array;
    else doneTasks = array;
    
    //if(toDoTasks.length != 0){
        const toDoData = JSON.stringify(toDoTasks);
        localStorage.setItem([displayDate] + "__" + [UNDONE], toDoData);
    //}
    //if(doneTasks.length != 0){
        const doneData = JSON.stringify(doneTasks);
        localStorage.setItem([displayDate] + "__" + [DONE], doneData);
    //}
}
function deleteTask(event){
    const selectedTask = event.target.parentNode;
    const isUnDone = selectedTask.classList.contains(UNDONE);
    selectedTask.parentNode.removeChild(selectedTask);
    
    console.log(selectedTask, isUnDone);
    removeData(selectedTask, isUnDone);
}

function init(){
    if(toDoForm != null) toDoForm.addEventListener('submit', function(event) {event.preventDefault(); onTaskEntered(event);});
    loadData();
}
init();