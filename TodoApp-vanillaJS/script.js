const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

addButton.addEventListener('click', addTodo);
todoList.addEventListener('click', handleTodoClick);

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        const todoItem = createTodoItem(todoText);
        todoList.appendChild(todoItem);
        todoInput.value = '';
    }
}

function createTodoItem(todoText) {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';

    todoItem.appendChild(checkbox);
    todoItem.appendChild(span);
    todoItem.appendChild(deleteButton);

    return todoItem;
}

function handleTodoClick(event) {
    const target = event.target;

    if (target.type === 'checkbox') {
        const todoItem = target.parentElement;
        todoItem.classList.toggle('completed');
    } else if (target.classList.contains('delete-button')) {
        const todoItem = target.parentElement;
        todoList.removeChild(todoItem);
    }
}
