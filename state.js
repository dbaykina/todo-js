import { checkClearCompleted } from "./footer.js";
import { countActiveTasks } from "./footer.js";
import { updateLocalStorage } from "./storage.js";

export const toggleTask = (target, tasksList) => {
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


