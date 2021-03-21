export const checkFooter = (tasksList) => {
  const footer = document.querySelector(".footer");
  if (tasksList.length !== 0) {
    footer.style.display = "block";
  } else {
    footer.style.display = "none";
  }
};

export const countActiveTasks = (tasksList) => {
  let footerCounter = document.querySelector(".todo-count strong");
  let amount = 0;

  tasksList.forEach((task) => {
    if (task.completed == false) {
      amount++;
    }
  });

  footerCounter.textContent = amount;
};

export const checkClearCompleted = (tasksList) => {
  const clearBtn = document.querySelector(".clear-completed");
  const taskCompleted = tasksList.find((task) => task.completed === true);
  if (taskCompleted) {
    clearBtn.style.display = "block";
  } else {
    clearBtn.style.display = "none";
  }
};

