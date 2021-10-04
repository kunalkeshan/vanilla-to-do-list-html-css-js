document.addEventListener("DOMContentLoaded", () => {
    
    //Form Elements
    const addTaskForm = document.getElementById("addTaskForm");
    const editTaskForm = document.getElementById("editTaskForm")
    const searchTaskForm = document.getElementById("searchTaskForm");

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
    let taskDeleteBtn = document.querySelectorAll(".trash-icon");

    //Edit Task Modal Elements
    const editTaskModal = document.getElementById("taskEditModal");
    const editTaskBtn = document.getElementById("editBtn");
    const closeEditTaskBtn = document.getElementById("closeBtn");

    //How to Use To-Do list Elements
    const howToUseModal = document.getElementById("howToUse");
    const howToUseLink = document.getElementById("howToUseLink");
    const howToUseCloseBtn = document.getElementById("htuBtn");
    const overlay = document.getElementById("overlay");

    //Check Local Storage if Tasks exist, if it does not, 
    //create new local storage, and add functionality to dom tasks.
    //if does exist, update from local storage and add functionality.
    if(!localStorage.getItem("tasks")){
        taskList = document.getElementById("taskList");
        localStorage.setItem("tasks", JSON.stringify(taskList.innerHTML));
        IconsAddFunctionality();
        completeTaskOnClick();
    } else {
        updateTaskList();
        IconsAddFunctionality();
        completeTaskOnClick();
    }



    //Global Modal Functions.

    //Function to display the edit task modal.
    function showEditTaskModal(taskIndex){
        editTaskModal.classList.add("add-in");
        editTaskModal.style.display = "flex";
        overlay.style.display = "block";
        editTaskInput.focus();

        taskItems = document.querySelectorAll(".taskItem");
        taskItems.forEach((task, index) => {
            if(index === taskIndex){
                editTaskInput.value = task.firstElementChild.innerHTML
                editTaskForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    editedName = editTaskInput.value;
                    if(editedName <= 50){
                        task.firstElementChild.innerHTML = editedName;
                        HideAllModals();
                        updateStorage();
                        completeTaskOnClick();
                        editTaskInput.value = "";
                        return;
                    } else {
                        alert("Task name cannot be more than 50 Characters!");
                        editTaskInput.value = task.firstElementChild.innerHTML;
                        editTaskInput.focus();
                    }
                });
            }
        });
    }

    //Function to display the how to use to do list modal.
    function showHowToUseModal(){
        howToUseModal.classList.add("add-in");
        howToUseModal.style.display = "block";
        overlay.style.display = "block";
    }

    //Common function to hide all modals and overlay.
    function HideAllModals(){
        howToUseModal.classList.remove("add-in");
        editTaskModal.classList.remove("add-in");
        editTaskModal.style.display = "none";
        howToUseModal.style.display = "none";
        overlay.style.display = "none";
    }

    //Function to check list height, and add scroll 
    //if item height is more than list height.
    function checkListHeight(){
        taskItems = document.querySelectorAll(".taskItem");
        const listHeight = taskList.offsetHeight;
        let itemsHeight = 0;
        taskItems.forEach((item) => {
            let marginTop = getComputedStyle(item).marginTop;
            let marginBottom = getComputedStyle(item).marginBottom
            let marginY = parseInt(marginTop) + parseInt(marginBottom);
            itemsHeight += item.offsetHeight + marginY;
        });
        if(itemsHeight > listHeight){
            taskList.style.overflowY = "scroll";
        } else {
            taskList.style.overflowY = "hidden";
        }
    }
    
    //To Update Tasks locally and recover in case of reload.
    function updateStorage(){
        displayAllTasks();
        taskList = document.getElementById("taskList")
        localStorage.setItem("tasks", JSON.stringify(taskList.innerHTML));
    }
    
    //Add tasks from local storage to list.
    function updateTaskList(){
        taskItems = JSON.parse(localStorage.getItem("tasks"));
        taskList.innerHTML = taskItems;
        checkListHeight();
    }

    //Add Functionality to the edit and delete icons.
    function IconsAddFunctionality() {
        taskItems = document.querySelectorAll(".taskItem");
        taskEditBtn = document.querySelectorAll(".edit-icon");    
        taskDeleteBtn = document.querySelectorAll(".trash-icon");
                
        taskItems.forEach((task, index) => {
            const editIcon = task.lastElementChild.firstElementChild;
            const deleteIcon = task.lastElementChild.lastElementChild;

            editIcon.addEventListener("click", () => {
                showEditTaskModal(index);
            });
            
            deleteIcon.addEventListener("click", () => {
                    task.remove();
                    checkListHeight();
                    updateStorage();                    
                    return;
            });

        });
    }

    //Create Task Function.
    function createTask(taskName){
        const li = document.createElement("li");
        const a = document.createElement("a");
        const span = document.createElement("span");
        const deleteIcon = document.createElement("img");
        const editIcon = document.createElement("img");

        deleteIcon.className = "trash-icon";
        editIcon.className = "edit-icon";
        deleteIcon.src = "src/images/bin.png";
        editIcon.src = "src/images/edit.png";

        li.className = "taskItem";
        a.className = "taskName";
        span.className = "task__cta";

        a.innerHTML = taskName;
        span.append(editIcon, deleteIcon);

        li.append(a, span);
        taskList.append(li);

        checkListHeight();
    }

    //Search through existing tasks
    function searchTasks(filter){
        taskItems = document.querySelectorAll(".taskItem")
        taskNames = document.querySelectorAll(".taskName");
        for(let i = 0; i < taskNames.length; i++){
            let name = taskNames[i].innerHTML.toUpperCase();;
            if(name.indexOf(filter.toUpperCase()) > -1){
                taskItems[i].style.display = "flex";
                checkListHeight();
            } else {
                taskItems[i].style.display = "none"; 
                checkListHeight(); 
            }
        }
    }

    //Adds a line-through when task is clicked and removes it 
    //again if line-through exists.
    function completeTaskOnClick(){
        taskItems = document.querySelectorAll(".taskItem");
        taskItems.forEach(task => {
            let taskName = task.firstElementChild;
            taskName.addEventListener("click", () => {
                let isCompleted = taskName.style.textDecoration === "line-through"
                if(isCompleted){
                    taskName.style.textDecoration = "none";
                } else {
                    taskName.style.textDecoration = "line-through";
                }
            updateStorage();
            });
        });
    }

    //Show all tasks after editing, or updating the search.
    function displayAllTasks(){
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
    taskEditBtn.forEach((editBtn) => {
        editBtn.addEventListener("click", () => {
            showEditTaskModal();
        });
    });

    //Close the edit modal when the close button is clicked.
    closeEditTaskBtn.addEventListener("click", () => {
        HideAllModals();
    });

    //Show the how to use modal when the link is clicked.
    howToUseLink.addEventListener("click", () =>{
        showHowToUseModal();
    });

    //Close the how to use modal when the close button is clicked.
    howToUseCloseBtn.addEventListener("click", () =>{
        HideAllModals();
    });

    //Close all Modals when the overlay is clicked.
    overlay.addEventListener("click", () =>{
        HideAllModals();
    });

    //Call the search function whenever something
    //is typed on the search input.
    searchInput.addEventListener("keyup", (e) => {
        let value = e.target.value;
        if(value){
            searchTasks(value);
        } else {
            displayAllTasks();
        }
    });

    //When Task is added add the task to list,
    //and add features to that task.
    addTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskName = addTaskInput.value;
        if(taskName.length <= 50){
            createTask(taskName);
            updateStorage();
            IconsAddFunctionality();
            completeTaskOnClick();
            addTaskInput.value = "";
        } else {
            alert("Task name cannot be more that 50 Characters!");
            addTaskInput.value = "";
        }
    });

})