import { getListItemTmp } from "./template.js";
import { eventProcessing } from "./handlers.js";
import { toggleTask } from "./state.js";
import { deleteTask } from "./taskProcessing.js";

export const renderTasks = (tasksList) => {
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
