const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elList = document.querySelector(".js-list");
let spanAll = document.querySelector(".js-span-all");
let spanCompleted = document.querySelector(".js-span-completed");
let spanUmCompleted = document.querySelector(".js-span-un-completed");
const todos = [];
let checkedInput = 0;
const renderTodo = (array, node) => {
  node.innerHTML = "";
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

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newTodo = {
    id: todos.length + 1,
    text: elInput.value,
    isCompleted: false,
  };
  todos.push(newTodo);
  elInput.value = "";
  renderTodo(todos, elList);
  spanAll.innerHTML = todos.length;
  spanUmCompleted.textContent = todos.length;
});

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-delete-btn ")) {
    spanUmCompleted.textContent = todos.length;
    const todoId = evt.target.dataset.todoID;
    const findedIndex = todos.findIndex((item) => item.id == todoId);
    todos.splice(findedIndex, 1);
    renderTodo(todos, elList);
    spanAll.innerHTML = 0;
    spanAll.innerHTML = todos.length;
    spanUmCompleted.innerHTML = 0;
    spanUmCompleted.innerHTML = todos.length;
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
    if (findedItem.isCompleted == true) {
      checkedInput += 1;
    }
    if (findedItem.isCompleted == false) {
      checkedInput -= 1;
    }
    spanCompleted.textContent = checkedInput;
    spanUmCompleted.textContent = todos.length - checkedInput;
  }
});

let btnAll = document.querySelector(".btn-all");
let btnCompleted = document.querySelector(".btn-completed");
let btnUnCompleted = document.querySelector(".btn-un-completed");
let btnBox = document.querySelector(".btn-box-js");

btnBox.addEventListener("click", (evt) => {
  if (evt.target.matches(".btn-all")) {
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".btn-completed")) {
    if (btnCompleted.textContent != 0) {
      let filteredTodo = todos.filter((item) => {
        if (item.isCompleted) {
          return item;
        }
      });
      spanCompleted.textContent = filteredTodo.length;
      renderTodo(filteredTodo, elList);
    }
  }
  if (evt.target.matches(".btn-un-completed")) {
    if (btnCompleted.textContent != 0) {
      let filteredTodo = todos.filter((item) => item.isCompleted == false);
      spanUmCompleted.textContent = filteredTodo.length;
      renderTodo(filteredTodo, elList);
    }
  }
});
