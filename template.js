export const getListItemTmp = (task) => {
  let listItem = document.createElement("li");
  listItem.setAttribute("data-id", task.id);

  let listItemDiv = document.createElement("div");
  listItemDiv.classList.add("view");

  let input = document.createElement("input");
  input.classList.add("toggle");
  input.type = "checkbox";

  let label = document.createElement("label");
  label.innerText = task.text;

  let button = document.createElement("button");
  button.classList.add("destroy");

  listItemDiv.appendChild(input);
  listItemDiv.appendChild(label);
  listItemDiv.appendChild(button);

  listItem.appendChild(listItemDiv);

  if (task.completed === true) {
    listItem.classList.add("completed");
    input.checked = true;
  }

  return listItem;
};

