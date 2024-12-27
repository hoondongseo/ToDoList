const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Function addTodo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("1글자 이상 입력하세요.");
        return false;
    }

    if (addBtn.value === "편집") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "추가";
        inputBox.value = "";
    }

    else {
        // P Tag 만들기
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        // Edit 버튼 만들기
        const editBtn = document.createElement("button");
        editBtn.innerText = "편집";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Delete 버튼 만들기
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "제거";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";
    }
}


// Function to update: (Edit/Delete) to do
const updateTodo = (e) => {
    if (e.target.innerHTML === "제거") {
        todoList.removeChild(e.target.parentElement);
    }

    if (e.target.innerHTML === "편집") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "편집";
        editTodo = e;
    }
}

addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);