const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("1글자 이상 입력하세요.");
        return false;
    }

    // P Tag 만들기
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // Delete 버튼 만들기
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    li.appendChild(deleteBtn);

    // Edit 버튼 만들기
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);

    todoList.appendChild(li);
    inputBox.value = "";
}

addBtn.addEventListener('click', addTodo);
