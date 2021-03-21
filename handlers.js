import { getTasksList } from "./storage.js";

export const eventProcessing = (el, cb) => {
  el.addEventListener("click", (e) => {
    const taskList = getTasksList();
    cb(e.target, taskList);
  });
};
