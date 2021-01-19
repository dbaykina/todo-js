"use strict";

let tasksList = [
  { id: "1", text: "выучить html", completed: true },
  { id: "2", text: "выучить css", completed: true },
  { id: "3", text: "выучить js", completed: false },
  { id: "4", text: "выучить фреймворк", completed: false },
  { id: "5", text: "написать несколько учебных проектов", completed: false },
  { id: "6", text: "пройти собеседование", completed: false },
  { id: "7", text: "получить работу", completed: false },
];

const createListItem = (task) => {
  let completeClass = "";
  if (task.completed == true) {
    completeClass = "completed";
  }
  return `<li data-id="${task.id}" class ="${completeClass}">
    <div class="view">
        <input class="toggle" type="checkbox">
        <label>${task.text}</label>
        <button class="destroy"></button> 
   </div>
</li>    
`;
};

const renderTasks = (tasksList) => {
  const toDoList = document.querySelector(".todo-list");
  toDoList.innerHTML = "";
  tasksList.forEach((item) => {
    const itemHTML = createListItem(item);
    toDoList.insertAdjacentHTML("afterbegin", itemHTML);
  });
};

const getID = () => {
  if (tasksList.length > 0) {
    return +tasksList[tasksList.length - 1].id;
  } else {
    return 0;
  }
};

const createNewTask = () => {
  const newtoDo = document.querySelector(".new-todo");
  const id = getID() + 1;

  const newTaskObj = {
    id: id,
    text: newtoDo.value,
    completed: false,
  };

  tasksList.push(newTaskObj);
  countActiveTasks();
  const newTask = createListItem(newTaskObj);

  const toDoList = document.querySelector(".todo-list");
  toDoList.insertAdjacentHTML("afterbegin", newTask);
  newtoDo.value = "";
};

document.querySelector(".new-todo").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    createNewTask();
  }
});

const deleteTask = (target) => {
  const taskDelete = target.closest("li");
  let taskDeleteId = taskDelete.getAttribute("data-id");

  tasksList.forEach((task, index) => {
    if (task.id == taskDeleteId) {
      tasksList.splice(index, 1);
    }
  });
  countActiveTasks();
  renderTasks(tasksList);
};

document.querySelector(".todo-list").addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("destroy")) {
    deleteTask(target);
  }
  if (target.classList.contains("toggle")) {
    toggleTask(target);
  }
});

document.querySelector(".clear-completed").addEventListener("click", () => {
  deleteCompletedTasks();
});

const toggleTask = (target) => {
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
  });

  countActiveTasks();
};

const countActiveTasks = () => {
  let footerCounter = document.querySelector(".todo-count strong");
  let amount = 0;

  tasksList.forEach((task) => {
    if (task.completed == false) {
      amount++;
    }
  });

  footerCounter.textContent = amount;
};

const deleteCompletedTasks = () => {
  tasksList = tasksList.filter((task) => !task.completed);

  renderTasks(tasksList);
};

renderTasks(tasksList);
countActiveTasks();
