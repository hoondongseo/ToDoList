const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const completedListContainer = document.getElementById('completed-list-container');
const completedCounter = document.getElementById('completed-counter');
const uncompletedCounter = document.getElementById('uncompleted-counter');
const clearTasksButton = document.getElementById('clear-tasks-button');

function updateCounters() {
    const completedTasks = document.querySelectorAll('#completed-list-container li').length;
    const uncompletedTasks = document.querySelectorAll('#list-container li').length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert('올바른 값을 입력해 주세요.');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    `;

    listContainer.appendChild(li);
    inputBox.value = '';

    const checkbox = li.querySelector('input[type="checkbox"]');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            completedListContainer.appendChild(li);
            li.classList.add('completed');
        } else {
            listContainer.appendChild(li);
            li.classList.remove('completed');
        }
        updateCounters();
    });

    editBtn.addEventListener('click', () => {
        const updatedTask = prompt('수정할 내용을 입력하세요.', li.querySelector('span').textContent);
        if (updatedTask !== null) {
            li.querySelector('span').textContent = updatedTask;
            li.classList.remove('completed');
            checkbox.checked = false;
            listContainer.appendChild(li);
            updateCounters();
        }
    });

    deleteBtn.addEventListener('click', () => {
        if (confirm('정말로 삭제하겠습니까?')) {
            li.remove();
            updateCounters();
        }
    });

    updateCounters();
}

inputBox.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

document.getElementById('input-button').addEventListener('click', addTask);

clearTasksButton.addEventListener('click', () => {
    if (confirm('정말 모든 작업을 삭제하시겠습니까?')) {
        listContainer.innerHTML = '';
        completedListContainer.innerHTML = '';
        localStorage.removeItem('tasks');
        updateCounters();
    }
});

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#list-container li, #completed-list-container li')).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed'),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(({ text, completed }) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <label>
                <input type="checkbox" ${completed ? 'checked' : ''}>
                <span>${text}</span>
            </label>
            <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        `;
        if (completed) {
            li.classList.add('completed');
            completedListContainer.appendChild(li);
        } else {
            listContainer.appendChild(li);
        }

        const checkbox = li.querySelector('input[type="checkbox"]');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                completedListContainer.appendChild(li);
                li.classList.add('completed');
            } else {
                listContainer.appendChild(li);
                li.classList.remove('completed');
            }
            updateCounters();
        });

        editBtn.addEventListener('click', () => {
            const updatedTask = prompt('수정할 내용을 입력하세요.', li.querySelector('span').textContent);
            if (updatedTask !== null) {
                li.querySelector('span').textContent = updatedTask;
                li.classList.remove('completed');
                checkbox.checked = false;
                listContainer.appendChild(li);
                updateCounters();
            }
        });

        deleteBtn.addEventListener('click', () => {
            if (confirm('정말로 삭제하겠습니까?')) {
                li.remove();
                updateCounters();
            }
        });
    });

    updateCounters();
}

window.addEventListener('load', loadTasks);
window.addEventListener('beforeunload', saveTasks);

new Sortable(listContainer, {
    animation: 150,
    onEnd: saveTasks
});

new Sortable(completedListContainer, {
    animation: 150,
    onEnd: saveTasks
});
