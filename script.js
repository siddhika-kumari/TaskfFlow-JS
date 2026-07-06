const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const totalTasksElement = document.getElementById("totalTasks");
const completedTasksElement = document.getElementById("completedTasks");
const pendingTasksElement = document.getElementById("pendingTasks");

// Input Validation

function validateInput(inputElement) {
  if (inputElement.value.trim() === "") {
    alert("Please enter a task!");
    return false;
  }
  return true;
}

// Task Creation

function createTask(task) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  let span = document.createElement("span");
  let editInput;
  let isEditing = false;

  li.classList.add("task-item");
  checkbox.type = "checkbox";
  span.textContent = task.task;
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit';
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';

  // Completed Checkbox

  if (task.completed) {
    checkbox.checked = true;
    li.classList.add("completed");
  }
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateTaskCounter();
    saveTasks();
  });

  // Edit Button

  editBtn.addEventListener("click", function () {
    if (!isEditing) {
      const editText = span.textContent;
      editInput = document.createElement("input");
      editInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          editBtn.click();
        }
      });
      editInput.type = "text";
      editInput.classList.add("edit-input");
      editInput.value = editText;
      span.replaceWith(editInput);
      editInput.focus();
      editInput.select();
      editBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save';
      isEditing = true;
    } else {
      if (!validateInput(editInput)) return;
      const updatedText = editInput.value.trim();
      const newSpan = document.createElement("span");
      newSpan.textContent = updatedText;
      editInput.replaceWith(newSpan);
      span = newSpan;
      editInput = null;
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit';
      isEditing = false;
      saveTasks();
      taskInput.focus();
      updateTaskCounter();
      updateEmptyState();
    }
  });

  // Delete Button

  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateEmptyState();
    updateTaskCounter();
    saveTasks();
    taskInput.focus();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

// Save Tasks

function saveTasks() {
  const tasks = [];
  for (let i = 0; i < taskList.children.length; i++) {
    const li = taskList.children[i];
    const taskText = li.querySelector("span").textContent;
    const completed = li.classList.contains("completed");
    const task = {
      task: taskText,
      completed,
    };
    tasks.push(task);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Ḷoad Tasks

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      createTask(task);
    }
  }
}

// Clear Input

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
  if (!validateInput(taskInput)) return;
  const task = {
    task: taskInput.value,
    completed: false,
  };
  createTask(task);
  clearInput();
  updateEmptyState();
  updateTaskCounter();
  saveTasks();
});

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

loadTasks();
updateEmptyState();
updateTaskCounter();
