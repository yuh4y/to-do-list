let taskInput = document.querySelector(".task-input input");
let todos = JSON.parse(localStorage.getItem("todos"));
let taskBox = document.querySelector(".task-box");

showToDo();

taskInput.addEventListener('keyup', (event) => {
    let userTask = taskInput.value.trim();
    if(event.key === 'Enter' && userTask) {
        console.log(todos);
        if (!todos){
            todos = [];
        }

        taskInput.value = "";
        let taskInfo = 
            {  
                name : userTask,
                status : "pending"
            }
        todos.push(taskInfo);
        localStorage.setItem("todos", JSON.stringify(todos));
        // localStorage.clear();
        showToDo();
    }
});

function showToDo() {
    let li = "";
    todos.forEach((todo,id) => {
        let isCompleted = todo.status === "completed" ? "checked" : "";
        li += `
            <li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="content ${isCompleted}">${todo.name}</p>
                </label>
                <div class="setting">
                    <ul class="task-menu">
                        <li><i onclick="editTask(${id}, '${todo.name}')" class="uil uil-edit"></i></li>
                        <li><i onclick="deleteTask(${id})" class="uil uil-trash-alt"></i></li>
                    </ul>   
                </div>
            </li>`  
    });
    taskBox.innerHTML = li;
}

function updateStatus(selectedTask) {
    let taskName = document.querySelector(".content");
    if (selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    showToDo();
}

function deleteTask(selectedTask){
    // console.log(selectedTask);
    todos.splice(selectedTask, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    showToDo();
}

function editTask(taskId, taskName) {
    console.log(taskId, taskName);

}