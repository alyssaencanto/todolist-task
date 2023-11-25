document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    document.getElementById("new-task-form").addEventListener("submit", function (event) {
        event.preventDefault();

        var taskText = document.getElementById("new-task-input").value;

        if (taskText.trim() !== "") {
            createTask(taskText);
            document.getElementById("new-task-input").value = "";
            saveTasks();
        }
    });

    function createTask(text) {
        var tasksContainer = document.getElementById("tasks");

        var taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.innerHTML = `
            <div class="content">
                <input type="text" class="text" value="${text}" readonly/>
            </div>
            <div class="actions">
                <button class="edit"><i class="fa-solid fa-pen-to-square" style="color: #fff;"></i></button>
                <button class="delete"><i class="fas fa-trash-alt" style="color: #fff;"></i></button>
                <button class="complete"><i class="fa-solid fa-check"></i>Complete</button>
            </div>
        `;

        taskElement.querySelector(".delete").addEventListener("click", function () {
            taskElement.remove();
            saveTasks();
        });

        taskElement.querySelector(".edit").addEventListener("click", function () {
            editTask(taskElement);
        });

        taskElement.querySelector(".complete").addEventListener("click", function () {
            toggleComplete(taskElement);
            saveTasks();
        });

        taskElement.addEventListener("click", function () {
            taskElement.style.animation = "taskComplete 2s";
            setTimeout(function () {
                taskElement.style.animation = "";
            }, 2000);
        });

        tasksContainer.appendChild(taskElement);
    }

    function editTask(taskElement) {
        var input = taskElement.querySelector(".text");
        var editButton = taskElement.querySelector(".edit");

        if (input.readOnly) {
            enableEditing(input, editButton);
        } else {
            saveChanges(input, editButton);
        }
    }

    function enableEditing(input, editButton) {
        input.readOnly = false;
        editButton.innerHTML = '<i class="fa-solid fa-floppy-disk" style="color: #ffffff;"></i>';
        input.focus();
    }

    function saveChanges(input, editButton) {
        input.readOnly = true;
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: #fff;"></i> ';
        saveTasks();
    }   

    function toggleComplete(taskElement) {
        var completeButton = taskElement.querySelector(".complete");
        var taskTextElement = taskElement.querySelector(".text");

        if (completeButton.textContent === "Complete") {
            completeButton.textContent = "Completed";
            taskElement.style.opacity = "0.5";
            taskTextElement.style.textDecoration = "line-through";
            taskElement.querySelector(".complete").disabled = true;
            showNotification("Congrats! You have completed this task");



        } else {
            completeButton.textContent = "Complete";
            taskElement.style.opacity = "1";
            taskTextElement.style.textDecoration = "none"
            taskElement.querySelector(".complete").disabled = false;
        }
    }

    function saveTasks() {
        var tasks = [];

        var taskElements = document.querySelectorAll(".text");
        taskElements.forEach(function (element) {
            tasks.push(element.value);
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks.forEach(function (taskText) {
            createTask(taskText);
        });
    }

    function completeTask(taskElement) {
        taskElement.style.opacity = "0.5";
        taskElement.querySelector(".complete").disabled = true;
    
        // Display a notification
        showNotification("Congrats! You have completed this task");
    }
    
    function showNotification(message) {
        var notification = document.createElement("div");
        notification.className = "notification";
        notification.innerText = message;
    
        document.body.appendChild(notification);
    
        setTimeout(function () {
            notification.remove();
        }, 3000);
    }

});