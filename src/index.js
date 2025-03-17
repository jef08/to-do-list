import "./styles.css";

import getCurrentDate from "./greeting.js";
console.log(getCurrentDate());

//add new task//
import addNewTask from "./newtaskbutton.js";
const newTaskButton = document.getElementById("new-task");
newTaskButton.addEventListener("click", () => {
    const existingForm = document.getElementById("new-task-form"); //to check if exists already
    
    if (existingForm) {
        existingForm.style.display = "flex";
    } else {
        addNewTask();
    }
});

//local Storage//
import { loadTasksFromLocalStorage } from "./localStorage.js";
import { createTaskDiv } from "./createTaskDivs.js";
window.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage().forEach(task => {
        createTaskDiv(task.taskName, task.priority, task.dueDate);
    })
})









const allButton = document.getElementById("all");
const todayButton = document.getElementById("today");
const weekButton  = document.getElementById("week");
const monthButton = document.getElementById("month");
const projectsButton = document.getElementById("projects");