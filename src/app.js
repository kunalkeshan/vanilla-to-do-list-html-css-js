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

    //Check Local Storage if Tasks exist
    if(!localStorage.getItem("tasks")){
        taskList = document.getElementById("taskList");
        localStorage.setItem("tasks", JSON.stringify(taskList.innerHTML));
    } else {
        updateTaskList();
        IconsAddFunctionality();
    }



    //Global Modal Functions
    //Function to display the edit task modal
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
                    if(editedName){
                        task.firstElementChild.innerHTML = editedName;
                        HideAllModals();
                        updateStorage();
                        editTaskInput.value = "";
                        return;
                    }
                })
            }
        });
    }

    //Function to display the how to use to do list modal
    function showHowToUseModal(){
        howToUseModal.classList.add("add-in");
        howToUseModal.style.display = "block";
        overlay.style.display = "block";
    }

    //Common function to hide all modals and overlay
    function HideAllModals(){
        howToUseModal.classList.remove("add-in");
        editTaskModal.classList.remove("add-in");
        editTaskModal.style.display = "none";
        howToUseModal.style.display = "none";
        overlay.style.display = "none";
    }

    //Function to check list height, and add scroll 
    //if item height is more than list height
    function checkListHeight(){
        taskItems = document.querySelectorAll(".taskItem");
        const listHeight = taskList.offsetHeight;
        let itemsHeight = 0;
        taskItems.forEach((item) => {
            let marginTop = getComputedStyle(item).marginTop;
            let marginBottom = getComputedStyle(item).marginBottom
            let marginY = parseInt(marginTop) + parseInt(marginBottom);
            itemsHeight += item.offsetHeight + marginY;
        })
        if(itemsHeight > listHeight){
            taskList.style.overflowY = "scroll";
        } else {
            taskList.style.overflowY = "hidden";
        }
    }
    
    //To Update Tasks locally and recover in case of reload
    function updateStorage(){
        taskList = document.getElementById("taskList")
        localStorage.setItem("tasks", JSON.stringify(taskList.innerHTML));
    }
    
    //Add tasks from local storage to list
    function updateTaskList(){
        taskItems = JSON.parse(localStorage.getItem("tasks"));
        taskList.innerHTML = taskItems;
        checkListHeight();
    }

    function IconsAddFunctionality() {
        taskItems = document.querySelectorAll(".taskItem");
        taskEditBtn = document.querySelectorAll(".edit-icon");    
        taskDeleteBtn = document.querySelectorAll(".trash-icon");
        
        // console.log(taskEditBtn, taskDeleteBtn, taskItems);
        
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

    function searchTasks(filter){
        taskItems = document.querySelectorAll(".taskItem")
        taskNames = document.querySelectorAll(".taskName");
        for(let i = 0; i < taskNames.length; i++){
            let name = taskNames[i].innerHTML;
            if(name.indexOf(filter) > -1){
                taskItems[i].style.display = "flex";
            } else {
                taskItems[i].style.display = "none";  
            }
        }
    }



    //Event listeners to invoke functions to display
    //and hide the respective modals

    taskEditBtn.forEach((editBtn) => {
        editBtn.addEventListener("click", () => {
            showEditTaskModal();
        });
    });

    closeEditTaskBtn.addEventListener("click", () => {
        HideAllModals();
    });

    howToUseLink.addEventListener("click", () =>{
        showHowToUseModal();
    })

    howToUseCloseBtn.addEventListener("click", () =>{
        HideAllModals();
    })

    overlay.addEventListener("click", () =>{
        HideAllModals();
    })

    searchInput.addEventListener("keyup", (e) => {
        let value = e.target.value;
        searchTasks(value);
    })


    //When Task is added.
    addTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskName = addTaskInput.value;
        createTask(taskName);
        updateStorage();
        IconsAddFunctionality();
        addTaskInput.value = "";
    });

    // editTaskForm.addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     taskItems = document.querySelectorAll(".taskItem");
    //     taskItems.forEach((task) => {
    //         console.log(editTaskInput)
    //         editedName = editTaskInput.value;
    //         task.firstElementChild.innerHTML = editedName;
    //         editTaskInput.value = "";
    //         HideAllModals();
    //         updateStorage();
    //         updateTaskList();
    //         return;
    //     })
    // })


})