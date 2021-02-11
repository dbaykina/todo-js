"use strict";

import { getTasksList } from "./storage.js";
import { renderTasks } from "./render.js";
import { addNewTaskListener } from "./taskProcessing.js";
import { filtersListener } from "./filter.js";
import { deleteCompletedTasksListener } from './taskProcessing.js';
import { checkFilter } from "./filter.js";
import { checkFooter } from "./footer.js";
import { countActiveTasks } from "./footer.js";
import { checkClearCompleted } from "./footer.js";

const initApp = () => {
    
  let tasksList = getTasksList();
  checkFooter(tasksList);
  tasksList = checkFilter(tasksList);
  renderTasks(tasksList);
  countActiveTasks(tasksList);
  checkClearCompleted(tasksList);

  //Listeners
  addNewTaskListener();
  filtersListener();
  deleteCompletedTasksListener();
  //.Listeners

};


initApp();

