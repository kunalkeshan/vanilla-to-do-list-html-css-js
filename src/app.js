document.addEventListener("DOMContentLoaded", () => {
    const addTaskForm = document.getElementById("addTaskForm");
    const searchTaskForm = document.getElementById("searchTaskForm");

    const editTaskModal = document.getElementById("taskEditModal");
    const editTaskBtn = document.getElementById("editBtn");
    const closeEditTaskBtn = document.getElementById("closeBtn");
    const howToUseModal = document.getElementById("howToUse");
    const howToUseLink = document.getElementById("howToUseLink");
    const howToUseCloseBtn = document.getElementById("htuBtn");
    const overlay = document.getElementById("overlay");


    // Add JS functionality when list items length 
    // is more than the height of the ul then make 
    // overflow-y as scroll
    function showEditTaskModal(){

    }

    function showHowToUseModal(){

    }

    function HideAllModal(){
        editTaskModal.style.display = "none";
        howToUseModal.style.display = "none";
        overlay.style.display = "none";
    }

    howToUseLink.addEventListener("click", () =>{
        howToUseModal.style.display="block";
        overlay.style.display="block";
    })

    howToUseCloseBtn.addEventListener("click", () =>{
        HideAllModal();
    })

    overlay.addEventListener("click", () =>{
        HideAllModal();
    })


})