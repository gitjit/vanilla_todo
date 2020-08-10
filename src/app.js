// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", loadlocalToDos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", trashCheck);
filterOption.addEventListener("change", filterTodo);

// Functions
function addToDo(event) {
  event.preventDefault();
  console.log("add to do");
  if (todoInput.value === "") return;
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Checkmark button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  // Create Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Add to the <ul>
  todoList.appendChild(todoDiv);

  //    {
  //        id:123,
  //        completed:false,
  //        text:"hello"
  //    }

  // Save to local storage
  let saveTodo = {
    id: Math.floor(Math.random() * 1000),
    completed: false,
    text: todoInput.value,
  };

  saveLocalToDos(saveTodo);

  // Clear input
  todoInput.value = "";
}

function trashCheck(event) {
  const item = event.target;
  if (item.classList[0] === "complete-btn") {
    const todoItem = item.parentElement;
    completeTodo(todoItem);
    console.log(todoItem);
    todoItem.classList.toggle("completed");
  }
  if (event.target.classList[0] === "trash-btn") {
    const todoItem = item.parentElement;
    todoItem.classList.add("fall");
    removeLocalTodo(todoItem);
    todoItem.addEventListener("transitionend", () => {
      todoItem.remove();
    });
    //todoItem.remove();
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        console.log("completed");
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "notcompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      default:
        break;
    }
  });
}

function saveLocalToDos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadlocalToDos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log("Inside load " + todos);

  todos.forEach(function (todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    if(todo.completed){
        todoDiv.classList.toggle("completed");
     }

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.text;
    newTodo.value = todo.id;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Checkmark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // Create Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Add to the <ul>
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const rtodo = todos.filter((t) => t.id == todo.children[0].value);
  const idx = todos.indexOf(rtodo);
  console.log(idx);
  todos.splice(idx, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function completeTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(td){
      if(td.id == todo.children[0].value)
      {
          td.completed = !td.completed;
      }
  })
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}
