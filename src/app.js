document.addEventListener("DOMContentLoaded", () => {
    //Form Elements
    const addTaskForm = document.getElementById("addTaskForm");
    const searchTaskForm = document.getElementById("searchTaskForm");

    //Task List
    const taskList = document.getElementById("taskList");

    //Task List Items
    let taskItems = document.querySelectorAll(".taskItem");
    let taskEditBtn = document.querySelectorAll(".taskItem .fa-edit ")
    let taskDeleteBtn = document.querySelectorAll(".taskItem .fa-trash-alt")

    //Edit Task Modal Elements
    const editTaskModal = document.getElementById("taskEditModal");
    const editTaskBtn = document.getElementById("editBtn");
    const closeEditTaskBtn = document.getElementById("closeBtn");

    //How to Use To-Do list Elements
    const howToUseModal = document.getElementById("howToUse");
    const howToUseLink = document.getElementById("howToUseLink");
    const howToUseCloseBtn = document.getElementById("htuBtn");
    const overlay = document.getElementById("overlay");

    //Global Modal Functions
    //Function to display the edit task modal
    function showEditTaskModal(){
        editTaskModal.classList.add("add-in");
        editTaskModal.style.display = "flex";
        overlay.style.display = "block";
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
        }
    }

    checkListHeight();


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


})