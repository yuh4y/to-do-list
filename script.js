let taskInput = document.querySelector(".task-input input");
let todos = JSON.parse(localStorage.getItem("todos"));
let taskBox = document.querySelector(".task-box");
let filters = document.querySelectorAll(".filters span");
let clearAllBtn = document.querySelector(".clear-btn");
// console.log(filters);

let editId = "";
let isEditedTask = false;

showToDo("all");

filters.forEach((filter) => {
    filter.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        filter.classList.add("active");
        showToDo(filter.id);
    });
});

function showToDo(filter) {
    let li = "";
    todos.forEach((todo,id) => {
        let isCompleted = todo.status === "completed" ? "checked" : "";
        if (filter == todo.status || filter == "all"){
            li += `
            <li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this, '${filter}')" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="content ${isCompleted}">${todo.name}</p>
                </label>
                <div class="setting">
                    <ul class="task-menu">
                        <li><i onclick="editTask(${id}, '${todo.name}')" class="uil uil-edit"></i></li>
                        <li><i onclick="deleteTask(${id}, '${filter}')" class="uil uil-trash-alt"></i></li>
                    </ul>   
                </div>
            </li>`
        }  
    });
    // if (li === ""){
    //     taskBox.innerHTML = `<span>You don't have task</span>`;
    // }else{
    //     taskBox.innerHTML = li;
    // }
    taskBox.innerHTML = li || `<span>You don't have task</span>`;
}

function updateStatus(selectedTask, filter) {
    let taskName = document.querySelector(".content");
    if (selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    // showToDo(todos[id].status);
    showToDo(filter);

}

function deleteTask(selectedTask, filter){
    // console.log(selectedTask);
    todos.splice(selectedTask, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    // showToDo(todos[id].status);
    showToDo(filter);

}

function editTask(taskId, taskName) {
    // console.log(taskId, taskName);
    taskInput.value = taskName;
    editId = taskId;
    isEditedTask = true;
}



taskInput.addEventListener('keyup', (event) => {
    let userTask = taskInput.value.trim();
    if(event.key === 'Enter' && userTask) {
        // console.log(todos);
        if (!isEditedTask){
            if (!todos){
                todos = [];
            }
    
            let taskInfo = 
            {  
                name : userTask,
                status : "pending"
            }
            todos.push(taskInfo);
        }else{
            todos[editId].name = userTask;
            isEditedTask = false;
        }

        taskInput.value = "";
        localStorage.setItem("todos", JSON.stringify(todos));
        // localStorage.clear();
        showToDo(document.querySelector("span.active").id);
    }
});

clearAllBtn.addEventListener("click", (event) => {
    todos.splice(0, todos.length);
    localStorage.setItem("todos", JSON.stringify(todos));
    showToDo("all");
});