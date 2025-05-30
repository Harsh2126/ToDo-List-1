document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const resetTasksBtn = document.getElementById("resetTasksBtn");
    const deleteTaskBtn = document.getElementById("deleteTaskBtn");
    const sortTasksBtn = document.getElementById("sortTasksBtn");

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex align-items-center justify-content-between";
            li.innerHTML = `
                <span class="task-text">${taskText}</span>
                <i class="fas fa-check tick-icon" style="display:none; color:green;"></i>
            `;

            li.addEventListener("click", function () {
                li.classList.toggle("done-task");
                const tick = li.querySelector('.tick-icon');
                if (li.classList.contains("done-task")) {
                    tick.style.display = "inline";
                    li.style.opacity = "0.6";
                } else {
                    tick.style.display = "none";
                    li.style.opacity = "1";
                }
            });

            taskList.appendChild(li);
            taskInput.value = "";
        }
    }

    // Add task on button click
    addTaskBtn.addEventListener("click", addTask);

    // Add task on Enter key press
    taskInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Reset Tasks button only clears the input field, not the task list
    resetTasksBtn.addEventListener("click", function () {
        taskInput.value = "";
        taskInput.focus();
    });

    // Delete button removes all done tasks
    deleteTaskBtn.addEventListener("click", function () {
        const doneTasks = taskList.querySelectorAll(".done-task");
        doneTasks.forEach(task => task.remove());
    });

    // Sort button sorts all tasks alphabetically (excluding done tasks)
    sortTasksBtn.addEventListener("click", function () {
        const tasks = Array.from(taskList.querySelectorAll("li:not(.done-task)"));
        const doneTasks = Array.from(taskList.querySelectorAll("li.done-task"));

        tasks.sort((a, b) => a.textContent.localeCompare(b.textContent));

        // Remove all tasks
        taskList.innerHTML = "";

        // Add sorted tasks first, then done tasks
        tasks.forEach(task => taskList.appendChild(task));
        doneTasks.forEach(task => taskList.appendChild(task));
    });
});