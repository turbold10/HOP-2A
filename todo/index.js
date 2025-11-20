const input = document.getElementById("input");
const addButton = document.getElementById("add-todo-button");
const todoLists = document.getElementById("todo-lists");
const test = document.querySelector(".test");

function addTodo() {
  test.style = "display:none";
  const inputValue = input.value;
  if (inputValue === "") return;

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-element");

  todoDiv.innerHTML = `
    <input type="checkbox" class="done-checkbox">
    <div class="todo-text">${inputValue}</div>
    <button class="delete-btn">delete</button>
  `;

  const todoCheckbox = todoDiv.querySelector(".done-checkbox");
  const todoText = todoDiv.querySelector(".todo-text");

  todoCheckbox.addEventListener("change", function () {
    todoText.classList.toggle("done");
  });

  todoLists.appendChild(todoDiv);

  input.value = "";
  let count = todoLists.children.length;
  console.log(count);
}

addButton.addEventListener("click", addTodo);

addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});
