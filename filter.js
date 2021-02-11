import { getTasksList } from "./storage.js";
import { renderTasks } from "./render.js";

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

export const checkFilter = (tasksList) => {
  const hash = location.hash;

  if (hash) {
    toggleFilterClass(hash);
    return filterTasks(hash, tasksList);
  }
  return tasksList;
};

const toggleFilterClass = (href) => {
  document.querySelectorAll(".filters a").forEach((btn) => {
    if (btn.getAttribute("href") == href) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
};

export const filtersListener = () => {
  document.querySelectorAll(".filters a").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let tasksList = getTasksList();
      let filterValue = e.target.getAttribute("href");
      const selectedTask = filterTasks(filterValue, tasksList);
      toggleFilterClass(filterValue);
      renderTasks(selectedTask);
    });
  });
};
