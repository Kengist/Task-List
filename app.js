// let val;

// val = document;
// val = document.all;
// val = document.all[2];
// val = document.all.length;
// val = document.head;
// val = document.body;
// val = document.doctype;
// val = document.domain;
// val = document.URL;
// val = document.characterSet;
// val = document.contentType;

// val = document.forms;
// val = document.forms[0];
// val = document.forms[0].id;
// val = document.forms[0].method;
// val = document.forms[0].action;

// val = document.links;
// val = document.links[0];
// val = document.links[0].id;
// val = document.links[0].className;
// val = document.links[0].classList[0];

// val = document.images;

// val = document.scripts;
// val = document.scripts[2].getAttribute('src');

// let scripts = document.scripts;

// let scriptsArr = Array.from(scripts);

// scriptsArr.forEach(function(script) {
//   console.log(script.getAttribute('src'));
// });

// console.log(val);
//Define Ui VARIABLES
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  ////DOM Load event
  document.addEventListener('DOMcontentLoaded', getTasks);
// Add task event
form.addEventListener('submit', addTask); 
taskList.addEventListener('click', removeTask);
// clear task event
clearBtn.addEventListener('click', clearTasks);

// filter tasks event
filter.addEventListener('keyup', filterTasks)
}
// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
    
  }
  tasks.forEach(function(task){
    
// create li element
const li = document.createElement('li');
// Add class
li.className ='collection-item';
// create text node and append to li
li.appendChild(document.createTextNode(task));
//Create new link element
const link = document.createElement('a');
link.className = 'delete-item secondary-content';

//Add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';
//Append the link to li 
li.appendChild(link);
//Append li to ul

taskList.appendChild(li);

  });
}

// Add Task
function addTask(e){
if(taskInput.value === ""){
  alert('Add a task')
}
// create li element
const li = document.createElement('li');
 // Add class
 li.className ='collection-item'
 // create text node and append to li
 li.appendChild(document.createTextNode(taskInput.value));
 //Create new link element
 const link = document.createElement('a');
 link.className = 'delete-item secondary-content';

 //Add icon html
 link.innerHTML = '<i class="fa fa-remove"></i>';
 //Append the link to li 
 li.appendChild(link);
 //Append li to ul  

taskList.appendChild(li);
// store in LS
storageTaskInLocalStorage(taskInput.value);
// clear input
taskInput.value = "";


  e.preventDefault();
}
//storage Task
function storageTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{

    tasks = JSON.parse(localStorage.getItem('tasks')); 
   
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
   if(confirm('Are you sure')) {
     e.target.parentElement.parentElement.remove();
    
     //remove from LS
     removeTaskFromLocalStorage(e.target.parentElement.parentElement)
   }

  }
 
}
//REMOVE FROM localSTORAGE
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{

    tasks = JSON.parse(localStorage.getItem('tasks')); 
   
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      task.splice(index, 1);
    }
  })
  localStorage.setItem('tasks',JSON.stringify(tasks));

}
// Clear Tasks 
function clearTasks() {
  // taskList.innerHTML = '';
while(taskList.firstChild ){
  taskList.removeChild(taskList.firstChild);
}

// Clear from LS
clearTasksFromLocalStorage();


} 
function clearTasksFromLocalStorage(){
  localStorage.clear();
}
// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase( ).indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  })
}