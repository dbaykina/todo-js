export const getTasksList = () => {
  return JSON.parse(localStorage.getItem("tasksList")) ?? [];
};

export const updateLocalStorage = (tasksList) => {
  localStorage.setItem("tasksList", JSON.stringify(tasksList));
  return JSON.parse(localStorage.getItem("tasksList")) ?? [];
};
