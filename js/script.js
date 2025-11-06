// seleção de elementos
const todoForm = document.querySelector("#form-todo");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const iconEdit = document.querySelector("#icon-edit");
const editInput = document.querySelector("#edit-input");
const iconRemove = document.querySelector("#icon-remove");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//Funções

const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoItem = document.createElement("div");
  todoItem.classList.add("list");
  todo.appendChild(todoItem);

  const todoIcon = document.createElement("div");
  todoIcon.classList.add("icon-list");
  todo.appendChild(todoIcon);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
  todoItem.appendChild(doneBtn);

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todoItem.appendChild(todoTitle);
  console.log("todoTitle:", todoTitle); // Deve mostrar o texto da tarefa

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  todoIcon.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-todo");
  removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  todoIcon.appendChild(removeBtn);

  todoList.appendChild(todo);
  console.log(todo);

  todoInput.value = "";
  todoInput.focus();
};

const toggleForms = () => {
  console.log("Toggling forms...");

  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) =>{
  
}

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("enviou");

  const inputValue = todoInput.value;
  const inputValueUpperCase =
    inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

  if (inputValueUpperCase) {
    saveTodo(inputValueUpperCase);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest(".todo");
  let todoTitle;

  //pega o innerText do h3, que é o texto da tarefa, e guarda na variável todoTitle.
  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
    console.log("todoTitle:", todoTitle); // Deve mostrar o texto da tarefa
  }

  if (targetEl.classList.contains("finish-todo")) {
    const title = parentEl.querySelector("h3");
    title.classList.toggle("done");
  }

  if (targetEl.closest(".remove-todo")) {
    const todo = targetEl.closest(".todo");
    todo.remove();
  }

  if (targetEl.classList.contains("edit-todo")) {
    console.log("foi");
    toggleForms();
    // Preenche o input de edição (editInput) com o título atual (todoTitle) – isso que permite o usuário ver o texto que vai editar.
    // E salva o valor antigo em oldInputValue, caso precise recuperar depois.
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
    console.log("todoTitle:", todoTitle); // Deve mostrar o texto da tarefa
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});

// parentElement sobe só um nível.

//closest(".todo") sobe até achar o ancestral com a classe .todo, não importa em qual nível esteja
