//Form Elements
const addTaskForm = document.getElementById("addTaskForm");
const editTaskForm = document.getElementById("editTaskForm");

//Input Fields
const addTaskInput = document.getElementById("addTaskInput");
const searchInput = document.getElementById("searchInput");
const editTaskInput = document.getElementById("editTaskInput");

//Task List
let taskList = document.getElementById("taskList");

//Task List Items
let taskItems = document.querySelectorAll(".taskItem");
let taskNames = document.querySelectorAll(".taskName")
let taskEditBtn = document.querySelectorAll(".edit-icon ");

//Edit Task Modal Elements
const editTaskModal = document.getElementById("taskEditModal");
const closeEditTaskBtn = document.getElementById("closeBtn");

//How to Use To-Do list Elements
const howToUseModal = document.getElementById("howToUse");
const howToUseLink = document.getElementById("howToUseLink");
const howToUseCloseBtn = document.getElementById("htuBtn");
const overlay = document.getElementById("overlay");

//Check Local Storage if Tasks exist, if it does not, 
//create new local storage, and add functionality to dom tasks.
//if does exist, update from local storage and add functionality.
document.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.getItem("tasks")){
        taskList = document.getElementById("taskList");
        localStorage.setItem("tasks", JSON.stringify(taskList.innerHTML));
    } else updateTaskList()
    
})


//Global Modal Functions.

const showEditTaskModal = (taskName) => {
    editTaskModal.classList.add("add-in");
    editTaskModal.style.display = "flex";
    overlay.style.display = "block";
    editTaskInput.focus();
    editTaskInput.value = taskName.innerHTML;
    editTaskForm.addEventListener("submit", (e) => editTask(e, editTaskInput, taskName))
}

//Function to display the how to use to do list modal.
const showHowToUseModal = () => {
    howToUseModal.classList.add("add-in");
    howToUseModal.style.display = "block";
    overlay.style.display = "block";
}

//Common function to hide all modals and overlay.
const HideAllModals = () => {
    howToUseModal.classList.remove("add-in");
    editTaskModal.classList.remove("add-in");
    editTaskModal.style.display = "none";
    howToUseModal.style.display = "none";
    overlay.style.display = "none";
}

//Function to check list height, and add scroll 
//if item height is more than list height.
const checkListHeight = () => {
    taskItems = document.querySelectorAll(".taskItem");
    const listHeight = taskList.offsetHeight;
    let itemsHeight = 0;
    taskItems.forEach((item) => {
        let marginTop = getComputedStyle(item).marginTop;
        let marginBottom = getComputedStyle(item).marginBottom
        let marginY = parseInt(marginTop) + parseInt(marginBottom);
        itemsHeight += item.offsetHeight + marginY;
    });
    if(itemsHeight > listHeight) taskList.style.overflowY = "scroll";
    else taskList.style.overflowY = "hidden";
}

//To Update Tasks locally and recover in case of reload.
const updateStorage = () => {
    displayAllTasks();
    taskList = document.getElementById("taskList");
    console.log(taskList)
    localStorage.setItem("tasks", JSON.stringify(taskList.innerHTML));
}

//Add tasks from local storage to list.
const updateTaskList = () => {
    taskList.innerHTML = "";
    taskItems = JSON.parse(localStorage.getItem("tasks"));
    const div = document.createElement("div");
    div.innerHTML = taskItems;
    taskItems = div.querySelectorAll("li");
    taskItems.forEach((task) => {
        createTask(task.firstElementChild.innerHTML)
    })    
    checkListHeight();
}

//Create Task Function.
const createTask = (taskName) => {
    const card = new Task(taskName);
    taskList.append(card.task)
    checkListHeight();
}

//Search through existing tasks, use Regular Expression test method to check is the search input
//pattern matches the input pattern
const searchTasks = (filter) => {
    taskItems = document.querySelectorAll(".taskItem")
    taskNames = document.querySelectorAll(".taskName");
    taskNames.forEach((task, index) => {
        let taskName = task.innerHTML;
        let taskNameRegExp = new RegExp(filter, "ig")
        let exists = taskNameRegExp.test(taskName);
        if(exists)taskItems[index].style.display = "flex";
        else taskItems[index].style.display = "none";
        checkListHeight();
    })
}

const editTask = (e, editTaskInput, taskName) => {
    e.preventDefault();
    const editedValue = editTaskInput.value;
    if(editedValue.length <= 50){
        taskName.innerHTML = editedValue;
        HideAllModals();
        updateStorage();
        editTaskInput.value = "";
        return;
    }
    alert("Task Name cannot be more than 50 Characters!");
    HideAllModals();
}

//Show all tasks after editing, or updating the search.
const displayAllTasks = () => {
    taskItems = document.querySelectorAll(".taskItem");
    taskItems.forEach((task) => {
        task.style.display = "flex";
    });
    checkListHeight();
    searchInput.value = "";
}


//Event listeners to invoke functions to display
//and hide the respective modals

//If tasks exist initially, then add functionality 
//to display the edit modal
taskEditBtn.forEach((editBtn) => editBtn.addEventListener("click", () => showEditTaskModal()));

//Close the edit modal when the close button is clicked.
closeEditTaskBtn.addEventListener("click", () => HideAllModals());

//Show the how to use modal when the link is clicked.
howToUseLink.addEventListener("click", () => showHowToUseModal());

//Close the how to use modal when the close button is clicked.
howToUseCloseBtn.addEventListener("click", () => HideAllModals());

//Close all Modals when the overlay is clicked.
overlay.addEventListener("click", () => HideAllModals());

//Call the search function whenever something
//is typed on the search input.
searchInput.addEventListener("keyup", (e) => {
    let value = e.target.value;
    if(value) searchTasks(value);
    else displayAllTasks();
    
});

//When Task is added add the task to list,
//and add features to that task.
addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = addTaskInput.value;
    if(taskName.length <= 50){
        createTask(taskName);
        updateStorage();
        addTaskInput.value = "";
    } else {
        alert("Task name cannot be more that 50 Characters!");
        addTaskInput.value = "";
    }
});

class Task {
    constructor(taskName){
        const div = document.createElement("div");
        div.innerHTML = `<li class="taskItem">
                            <a class="taskName">${taskName}</a>
                            <span class="task__cta">
                                <img src="src/images/edit.png" class="edit-icon">
                                <img src="src/images/bin.png" class="trash-icon">
                            </span>
                        </li>`;
        this.task = div.firstChild;
        this.taskName = this.task.querySelector(".taskName");
        this.editBtn = this.task.querySelector(".edit-icon");
        this.deleteBtn = this.task.querySelector(".trash-icon");
        this.editBtn.addEventListener("click", () => this.editTask())
        this.deleteBtn.addEventListener("click", () => this.deleteTask())
        this.taskName.addEventListener("click", () => this.completeTask())
    }
    deleteTask(){
        this.task.remove();
        checkListHeight();
        updateStorage();                    
        return;
    }
    editTask(){
        console.log(this.taskName.innerHTML)
        showEditTaskModal(this.taskName)
    }
    completeTask(){
        const isCompleted = this.taskName.style.textDecoration === "line-through"
        if(isCompleted) this.taskName.style.textDecoration = "none";
        else this.taskName.style.textDecoration = "line-through";
        updateStorage();
    }
}

const myTask = new Task("My Task");
console.log(myTask)

document.lastElementChild.append(myTask.task);