"use strict";

const tasksList = [
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
        <button class="destroy"></button>
        <label>${task.text}</label>
       <button></button>
   </div>
</li>    
`;
};

const renderTasks = () => {
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
    complete: false,
  };

  tasksList.push(newTaskObj);

  const newTask = createListItem(newTaskObj);

  const view = document.querySelector(".view");
  view.insertAdjacentHTML("afterbegin", newTask);
  newtoDo.value = "";
};

document.querySelector(".new-todo").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    createNewTask();
  }
});

renderTasks();
