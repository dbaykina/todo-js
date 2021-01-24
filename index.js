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

//let tasksList = [];

const createListItem = (task) => {
  let completeClass = "";
  let checked = "";
  if (task.completed === true) {
    completeClass = "completed";
    checked = "checked";
  }
  return `<li data-id="${task.id}" class ="${completeClass}">
    <div class="view">
        <input class="toggle" type="checkbox" ${checked}>
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
  checkFooter();
};

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
  checkClearCompleted();
  checkFooter();
};

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
    checkClearCompleted();
    
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
  checkFooter();
};

const checkClearCompleted = () => {
  const clearBtn = document.querySelector(".clear-completed");
  const taskCompleted = tasksList.find((task) => task.completed === true);
  if (taskCompleted) {
    clearBtn.style.display = "block";
  } else {
    clearBtn.style.display = "none";
  }
};

const filterTasks = (e) => {
  const target = e.target;

  document.querySelectorAll(".filters a").forEach((btn) => {
    btn.classList.remove("selected");
  });

  let filterValue = target.getAttribute("href");

  switch (filterValue) {
    case "#/completed":
      let completedTasks = tasksList.filter((task) => task.completed);
      renderTasks(completedTasks);
      target.classList.add("selected");
      break;
    case "#/active":
      let activeTasks = tasksList.filter((task) => !task.completed);
      renderTasks(activeTasks);
      target.classList.add("selected");
      break;
    case "#/":
      renderTasks(tasksList);
      target.classList.add("selected");
      break;
  }
};

const checkFooter = () => {
  const footer = document.querySelector(".footer");
  if (tasksList.length !== 0) {
    footer.style.display = "block";
  } else {
    footer.style.display = "none";
  }
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

document.querySelector(".new-todo").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    createNewTask();
  }
});

document.querySelector(".clear-completed").addEventListener("click", () => {
  deleteCompletedTasks();
});

document.querySelectorAll(".filters a").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterTasks(e);
  });
});

renderTasks(tasksList);
countActiveTasks();
checkClearCompleted();
checkFooter();
