const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ? changeTheme('standard') : changeTheme(savedTheme);

function addToDo(event) {
    event.preventDefault();

    if (toDoInput.value === '') {
        alert("You must write something!");
        return;
    }

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    const newToDo = document.createElement('li');
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    savelocal(toDoInput.value);

    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('check-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(checkButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add('edit-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(editButton);

    toDoList.appendChild(toDoDiv);
    toDoInput.value = '';
}

function deletecheck(event) {
    const item = event.target;

    if (item.classList.contains('delete-btn')) {
        item.parentElement.classList.add("fall");
        removeLocalTodos(item.parentElement);
        item.parentElement.addEventListener('transitionend', function () {
            item.parentElement.remove();
        });
    }

    if (item.classList.contains('check-btn')) {
        item.parentElement.classList.toggle("completed");
    }

    if (item.classList.contains("edit-btn")) {
        const todoItem = item.parentElement.querySelector(".todo-item");
        const newText = prompt("Edit your task:", todoItem.innerText);
        if (newText !== null && newText.trim() !== "") {
            todoItem.innerText = newText;
            updateLocalTodos();
        }
    }
}

function savelocal(todo) {
    let todos = localStorage.getItem('todos') === null ? [] : JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalTodos() {
    const todos = [];
    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach((todo) => {
        todos.push(todo.innerText);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos = localStorage.getItem('todos') === null ? [] : JSON.parse(localStorage.getItem('todos'));
    todos.forEach(function (todo) {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `${savedTheme}-todo`);

        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        const checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checkButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add("edit-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(editButton);

        toDoList.appendChild(toDoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos = localStorage.getItem('todos') === null ? [] : JSON.parse(localStorage.getItem('todos'));
    const todoText = todo.children[0].innerText;
    todos = todos.filter(item => item !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = color;

    document.body.className = color;

    if (color === 'darker') {
        document.getElementById('title').classList.add('darker-title');
    } else {
        document.getElementById('title').classList.remove('darker-title');
    }

    document.querySelector('input').className = `${color}-input`;

    document.querySelectorAll('.todo').forEach(todo => {
        todo.className = `todo ${color}-todo${todo.classList.contains("completed") ? " completed" : ""}`;
    });

    document.querySelectorAll('button').forEach(button => {
        if (button.classList.contains('check-btn')) {
            button.className = `check-btn ${color}-button`;
        } else if (button.classList.contains('delete-btn')) {
            button.className = `delete-btn ${color}-button`;
        } else if (button.classList.contains('todo-btn')) {
            button.className = `todo-btn ${color}-button`;
        } else if (button.classList.contains('edit-btn')) {
            button.className = `edit-btn ${color}-button`;
        }
    });
}
