"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const input = document.querySelector('.form-control');
const form = document.querySelector('.form');
const list = document.querySelector('.list');
const tasks = loadTasks();
tasks.forEach(addTask);
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input?.value == '' || input?.value == null) {
        return;
    }
    const newTask = {
        id: (0, uuid_1.v4)(),
        input: input.value,
        isChecked: false,
    };
    addTask(newTask);
    input.value = '';
    tasks.push(newTask);
    localStorage.setItem('TASKS', JSON.stringify(tasks));
});
function addTask(task) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = `
  <input type="checkbox" class="check" id=${task.id} />
  <label for=${task.id} class="label">
  <svg width="45" height="45" viewBox="0 0 95 95">
  <rect
    x="30"
    y="20"
    width="50"
    height="50"
    stroke="black"
    fill="none"
  ></rect>
  <g transform="translate(0,-952.36222)">
    <path
      d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
      stroke="black"
      stroke-width="3"
      fill="none"
      class="path1"
    ></path>
  </g>
</svg>
</label>
<label for="">${task.input}</label>
<button class="x-button" id=${task.id}>
  <span id=${task.id} class="material-symbols-outlined"> delete_forever </span>
</button>
  `;
    list?.append(listItem);
    const checkbox = listItem.querySelector('.check');
    checkbox?.addEventListener('change', () => {
        task.isChecked = checkbox.checked;
        saveTasks();
    });
    checkbox.checked = task.isChecked;
    listItem.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('material-symbols-outlined')) {
            const taskId = target.id;
            removeTask(taskId);
        }
    });
}
function saveTasks() {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
}
function removeTask(taskId) {
    const taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.parentElement?.remove();
    }
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem('TASKS', JSON.stringify(tasks));
    }
}
function loadTasks() {
    const taskJSON = localStorage.getItem('TASKS');
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
