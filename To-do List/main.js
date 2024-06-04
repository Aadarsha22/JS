// Get references to elements
const inputVal = document.getElementById('inputVal');
const addTaskBtn = document.getElementById('btn');

// Add event listener to "Add task" button
addTaskBtn.addEventListener('click', () => {
    if(inputVal.value.trim() === '') {
        alert('Please enter task');
    }
    if(inputVal.value.trim() !== '') {
        // If input field is not empty, add or update task
        if (addTaskBtn.textContent === 'Add task') {
            addTask(inputVal.value);
        } else {    
            updateTask(inputVal.dataset.index, inputVal.value);
        }
    }
});

// Add event listener to input field for "Enter" key press
inputVal.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if (inputVal.value.trim() === '') {
            alert('Please enter a task');
        } else {
            if (addTaskBtn.textContent === 'Add task') {
                addTask(inputVal.value);
            } else {
                updateTask(inputVal.dataset.index, inputVal.value);
            }
        }
    }
});

// Function to add task
function addTask(task) {
    let taskList = getTaskListFromLocalStorage();
    taskList.push(task);
    localStorage.setItem('localItem', JSON.stringify(taskList));
    showlist();
    clearInput();

    // Scroll the entire page to the bottom
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// Function to update task
function updateTask(index, newTask) {
    let taskList = getTaskListFromLocalStorage();
    taskList[index] = newTask;
    localStorage.setItem('localItem', JSON.stringify(taskList));
    showlist();
    clearInput();
}

// Function to retrieve task list from local storage
function getTaskListFromLocalStorage() {
    let localItems = JSON.parse(localStorage.getItem('localItem'));
    return localItems === null ? [] : localItems;
}

// Function to display tasks
function showlist() {
    let output = '';
    let taskListShow = document.querySelector('.todoListItem');
    let taskList = getTaskListFromLocalStorage();
    taskList.forEach((data, index) => {
        output += `
        <div class="todoList">
            <p class="pText">${data}</p>
            <div class="todoListItem">
                <button class="updateTask" onClick="updateInput(${index})"><img src="edit.png"></button>
                <button class="deleteTask" onClick="deleteItem(${index})"><img src="delete.png"></button>
            </div>
        </div>`;
    });
    taskListShow.innerHTML = output;
}

// Function to update input field for editing task
function updateInput(index) {
    let taskList = getTaskListFromLocalStorage();
    inputVal.value = taskList[index];
    inputVal.dataset.index = index; // Store the index in a custom attribute
    addTaskBtn.textContent = 'Update'; // Change button text to "Update"
}

// Function to clear input field
function clearInput() {
    inputVal.value = '';
    inputVal.removeAttribute('data-index'); // Remove custom attribute
    addTaskBtn.textContent = 'Add task'; // Change button text back to "Add task"
}

// Function to delete task
function deleteItem(index) {
    let taskList = getTaskListFromLocalStorage();
    taskList.splice(index, 1);
    localStorage.setItem('localItem', JSON.stringify(taskList));
    showlist();
}

// Function to clear all tasks
function clearTask() {
    localStorage.clear();
    showlist();
}

// Initial display of tasks
showlist();