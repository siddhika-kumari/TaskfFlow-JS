const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const totalTasksElement = document.getElementById("totalTasks");
const completedTasksElement = document.getElementById("completedTasks");
const pendingTasksElement = document.getElementById("pendingTasks");

// Input Validation

function validateInput() {
  if (taskInput.value.trim() === "") {
    alert("Please enter a task!");
    return false;
  }
  return true;
}

// Task Creation

function createTask(taskText) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");

  li.classList.add("task-item");
  checkbox.type = "checkbox";
  span.textContent = taskText;
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';

  // Completed Checkbox

  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed");
    updateTaskCounter();
  });

  // Delete Button

  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateEmptyState();
    updateTaskCounter();
    taskInput.focus();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

function clearInput() {
  taskInput.value = "";
  taskInput.focus();
}

// Empty Message

function updateEmptyState() {
  if (taskList.children.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}

// Task Counter

function updateTaskCounter() {
  const totalTasks = taskList.children.length;
  const completedTasks = document.querySelectorAll(".completed").length;
  const pendingTasks = totalTasks - completedTasks;

  totalTasksElement.textContent = totalTasks;
  completedTasksElement.textContent = completedTasks;
  pendingTasksElement.textContent = pendingTasks;
}

// Add Button

addBtn.addEventListener("click", function () {
  if (!validateInput()) return;
  const taskText = taskInput.value;
  createTask(taskText);
  clearInput();
  updateEmptyState();
  updateTaskCounter();
});

taskInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        addBtn.click();

    }

});

updateEmptyState();
updateTaskCounter();
