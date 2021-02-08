"use strict";

const getTasksList = () => {
  return JSON.parse(localStorage.getItem("tasksList")) ?? [];
};

const updateLocalStorage = (tasksList) => {
  localStorage.setItem("tasksList", JSON.stringify(tasksList));
  return JSON.parse(localStorage.getItem("tasksList")) ?? [];
};

const eventProcessing = (el, cb) => {
  el.addEventListener("click", (e) => {
    const taskList = getTasksList();
    cb(e.target, taskList);
  });
};

const getListItemTmp = (task) => {
  let listItem = document.createElement("li");
  listItem.setAttribute("data-id", task.id);

  let listItemDiv = document.createElement("div");
  listItemDiv.classList.add("view");

  let input = document.createElement("input");
  input.classList.add("toggle");
  input.type = "checkbox";

  let label = document.createElement("label");
  label.innerText = task.text;

  let button = document.createElement("button");
  button.classList.add("destroy");

  listItemDiv.appendChild(input);
  listItemDiv.appendChild(label);
  listItemDiv.appendChild(button);

  listItem.appendChild(listItemDiv);

  if (task.completed === true) {
    listItem.classList.add("completed");
    input.checked = true;
  }

  return listItem;
};

const renderTasks = (tasksList) => {
  const toDoList = document.querySelector(".todo-list");
  toDoList.innerHTML = "";
  tasksList.forEach((item) => {
  const itemHTML = getListItemTmp(item);

    let checkedInput = itemHTML.querySelector(".toggle");
    let destroyButton = itemHTML.querySelector(".destroy");

    eventProcessing(checkedInput, toggleTask);
    eventProcessing(destroyButton, deleteTask);

    toDoList.appendChild(itemHTML);
  });
};

const getID = (tasksList) => {
  if (tasksList.length > 0) {
    return +tasksList[tasksList.length - 1].id;
  } else {
    return 0;
  }
};

const createNewTask = (tasksList) => {
  const newtoDo = document.querySelector(".new-todo");
  const id = getID(tasksList) + 1;

  const newTaskObj = {
    id: id,
    text: newtoDo.value,
    completed: false,
  };

  tasksList.push(newTaskObj);
  tasksList = updateLocalStorage(tasksList);
  countActiveTasks(tasksList);
  const newTask = getListItemTmp(newTaskObj);

  let checkedInput = newTask.querySelector(".toggle");
  let destroyButton = newTask.querySelector(".destroy");
  eventProcessing(checkedInput, toggleTask);
  eventProcessing(destroyButton, deleteTask);

  const toDoList = document.querySelector(".todo-list");
  toDoList.appendChild(newTask);
  newtoDo.value = "";
  checkFooter(tasksList);
};

const deleteTask = (target, tasksList) => {
  const taskDelete = target.closest("li");
  let taskDeleteId = taskDelete.getAttribute("data-id");

  tasksList.forEach((task, index) => {
    if (task.id == taskDeleteId) {
      tasksList.splice(index, 1);
    }
  });

  tasksList = updateLocalStorage(tasksList);
  countActiveTasks(tasksList);
  renderTasks(tasksList);
  checkClearCompleted(tasksList);
  checkFooter(tasksList);
};

const toggleTask = (target, tasksList) => {
  const taskChecked = target.closest("li");
  tasksList.forEach((task) => {
    if (taskChecked.getAttribute("data-id") == task.id) {
      if (task.completed === true) {
        task.completed = false;
        taskChecked.classList.remove("completed");
      } else {
        task.completed = true;
        taskChecked.classList.add("completed");
      }
    }
    checkClearCompleted(tasksList);
  });
  tasksList = updateLocalStorage(tasksList);
  countActiveTasks(tasksList);
};

const countActiveTasks = (tasksList) => {
  let footerCounter = document.querySelector(".todo-count strong");
  let amount = 0;

  tasksList.forEach((task) => {
    if (task.completed == false) {
      amount++;
    }
  });

  footerCounter.textContent = amount;
};

const deleteCompletedTasks = (tasksList) => {
  tasksList = tasksList.filter((task) => !task.completed);
  tasksList = updateLocalStorage(tasksList);
  const completedTasks = tasksList.filter((task) => task.completed);
  renderTasks(completedTasks);
  checkClearCompleted(completedTasks);
};

const checkClearCompleted = (tasksList) => {
  const clearBtn = document.querySelector(".clear-completed");
  const taskCompleted = tasksList.find((task) => task.completed === true);
  if (taskCompleted) {
    clearBtn.style.display = "block";
  } else {
    clearBtn.style.display = "none";
  }
};

const filterTasks = (filterValue, tasksList) => {
  let selectedTask = [];

  switch (filterValue) {
    case "#/completed":
      selectedTask = tasksList.filter((task) => task.completed);
      break;
    case "#/active":
      selectedTask = tasksList.filter((task) => !task.completed);
      break;
    case "#/":
      selectedTask = getTasksList();
      break;
  }

  return selectedTask;
};

const checkFilter = (tasksList) => {
  const hash = location.hash;

  if (hash) {
    toggleFilterClass(hash);
    return filterTasks(hash, tasksList);
  }
  return tasksList;
};

const checkFooter = (tasksList) => {
  const footer = document.querySelector(".footer");
  if (tasksList.length !== 0) {
    footer.style.display = "block";
  } else {
    footer.style.display = "none";
  }
};

document.querySelector(".new-todo").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    let tasksList = getTasksList();
    createNewTask(tasksList);
  }
});

document.querySelector(".clear-completed").addEventListener("click", () => {
  let tasksList = getTasksList();
  deleteCompletedTasks(tasksList);
});

document.querySelectorAll(".filters a").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let tasksList = getTasksList();

    let filterValue = e.target.getAttribute("href");
    const selectedTask = filterTasks(filterValue, tasksList);

    toggleFilterClass(filterValue);

    renderTasks(selectedTask);
  });
});

const toggleFilterClass = (href) => {
  document.querySelectorAll(".filters a").forEach((btn) => {
    if (btn.getAttribute("href") == href) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
};

let tasksList = getTasksList();
checkFooter(tasksList);

tasksList = checkFilter(tasksList);

renderTasks(tasksList);
countActiveTasks(tasksList);
checkClearCompleted(tasksList);
