const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elList = document.querySelector(".js-list");
const elAllCount = document.querySelector(".js-all-count");
const elCompletedCount = document.querySelector(".js-completed-count");
const elUncompletedCount = document.querySelector(".js-uncompleted-count");
const elBtns = document.querySelector(".js-btns");

const localData = JSON.parse(window.localStorage.getItem("todos"));
const todos = localData || [];

let checkedInput = 0;
const renderTodo = (array, node) => {
  window.localStorage.setItem("todos", JSON.stringify(todos));
  node.innerHTML = "";
  elAllCount.textContent = todos.length;
  elCompletedCount.textContent = todos.filter(
    (item) => item.isCompleted
  ).length;
  elUncompletedCount.textContent = todos.filter(
    (item) => !item.isCompleted
  ).length;
  array.forEach((item) => {
    const newItem = document.createElement("li");
    const newSpan = document.createElement("span");
    const newInput = document.createElement("input");
    const newDeleteButton = document.createElement("button");
    const newEditButton = document.createElement("button");

    newItem.setAttribute("class", "list-group-item d-flex align-items-center");

    newSpan.setAttribute("class", "flex-grow-1 mx-4");
    newInput.setAttribute("class", "form-check-input m-0 js-check");
    newItem.appendChild(newEditButton);
    newEditButton.setAttribute("class", "btn btn-warning me-3 js-edit-btn");
    newDeleteButton.setAttribute("class", "btn btn-danger js-delete-btn");

    newSpan.textContent = item.text;
    newInput.type = "checkbox";
    newDeleteButton.textContent = "DELETE";
    newEditButton.textContent = "EDIT";

    newDeleteButton.dataset.todoID = item.id;
    newEditButton.dataset.todoId = item.id;
    newInput.dataset.todoId = item.id;

    newItem.appendChild(newInput);
    newItem.appendChild(newSpan);
    newItem.appendChild(newEditButton);
    newItem.appendChild(newDeleteButton);
    if (item.isCompleted) {
      newInput.checked = true;
      newSpan.style.textDecoration = "line-through";
    }

    node.appendChild(newItem);
  });
};
if (todos.length !== 0) {
  renderTodo(todos, elList);
} else {
  const elTitle = document.createElement("h3");
  elTitle.textContent = "Todolar yoq 😐";
  elList.appendChild(elTitle);
  elTitle.setAttribute("class", "text-center");
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    text: elInput.value,
    isCompleted: false,
  };
  todos.push(newTodo);
  elInput.value = "";
  renderTodo(todos, elList);
});

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-delete-btn ")) {
    const todoId = evt.target.dataset.todoID;
    const findedIndex = todos.findIndex((item) => item.id == todoId);
    todos.splice(findedIndex, 1);
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".js-edit-btn")) {
    const todoId = evt.target.dataset.todoId;
    const findedItem = todos.find((item) => item.id == todoId);
    const newText = prompt("yangi todo kiriting", findedItem.text);
    findedItem.text = newText;
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".js-check")) {
    const todoId = evt.target.dataset.todoId;
    const findedItem = todos.find((item) => item.id == todoId);
    findedItem.isCompleted = !findedItem.isCompleted;
    renderTodo(todos, elList);
  }
});

elBtns.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-all")) {
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".js-completed")) {
    const filteredtodos = todos.filter((item) => item.isCompleted);
    renderTodo(filteredtodos, elList);
  }
  if (evt.target.matches(".js-uncompleted")) {
    const filteredtodos = todos.filter((item) => !item.isCompleted);
    renderTodo(filteredtodos, elList);
  }
  if (evt.target.matches(".js-all-delete")) {
    window.localStorage.removeItem("todos");
    location.reload();
  }
});

const btnMode = document.querySelector(".dark-mode-btn");
let theme = false;

btnMode.addEventListener("click", () => {
  theme = !theme;
  const bg = theme ? "dark" : "light";
  window.localStorage.setItem("theme", bg);
  changeTheme();
});

function changeTheme() {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}
changeTheme();
