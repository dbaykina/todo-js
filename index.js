const task = { 
    id: "1", 
    text: "выучить html",
    completed: true }


const createListItem = (task) => {
let completeClass= '';
if (task.completed == true) {
    completeClass = 'completed';
}
  return  `<li data-id="${task.id}" class ="${completeClass}">
            <div class="view">
                <input class="toggle" type="checkbox">
                <label>${task.text}</label>
            <button></button>
            </div>
        </li>`;

}


const renderTask = () => {
        const toDoList = document.querySelector('.todo-list');
        const el = createListItem(task);
        toDoList.insertAdjacentHTML('afterbegin', el);
}

renderTask();