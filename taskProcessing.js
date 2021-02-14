import { getTasksList, updateLocalStorage } from "./storage.js";
import { countActiveTasks } from "./footer.js";
import { getListItemTmp } from "./template.js";
import { checkFooter } from "./footer.js";
import { eventProcessing } from "./handlers.js";
import { renderTasks } from "./render.js";
import { checkClearCompleted } from "./footer.js";
import { toggleTask } from "./state.js";
import { checkFilter } from "./filter.js";

const getID = (tasksList) => {
  if (tasksList.length > 0) {
    return +tasksList[tasksList.length - 1].id;
  } else {
    return 0;
  }
};

 export const createNewTask = (tasksList) => {
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

export const deleteTask = (target, tasksList) => {
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

export const deleteCompletedTasks = (tasksList) => {
  tasksList = tasksList.filter((task) => !task.completed);
  tasksList = updateLocalStorage(tasksList);
  tasksList = checkFilter(tasksList);
  renderTasks(tasksList);
  checkClearCompleted(tasksList);
  //const completedTasks = tasksList.filter((task) => task.completed);
  /*let completedTasks = tasksList;
  renderTasks(completedTasks);
  checkClearCompleted(completedTasks);*/
};

export const deleteCompletedTasksListener = () => {
document.querySelector(".clear-completed").addEventListener("click", () => {
  let tasksList = getTasksList();
  deleteCompletedTasks(tasksList);
});
}

export const addNewTaskListener = () => {

  document.querySelector(".input-form").addEventListener('submit', (e) => {
    e.preventDefault();
    let tasksList = getTasksList();
    createNewTask(tasksList);
  });

};



