import editImgPath from './images/edit-pencil.svg';
import delImgPath from './images/trash-can.svg';
import addNewTask from './newtaskbutton';
import { saveTaskToLocalStorage, loadTasksFromLocalStorage } from './localStorage';

export function createTaskDiv(taskName, priority, dueDate) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add("task-div");

    const markDone = document.createElement('input');
    markDone.setAttribute("type", "checkbox");
    markDone.classList.add("mark-done");

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = taskName;
    taskTitle.classList.add("task-title");

    const taskPriority = document.createElement('p');
    taskPriority.textContent = `Priority: ${priority}`;
    taskPriority.classList.add("task-priority");

    const taskDueDate = document.createElement('p');
    taskDueDate.textContent = `Due Date: ${dueDate}`;
    taskDueDate.classList.add("task-due-date");

    const editButton = document.createElement('button');
    editButton.classList.add("edit-button");
    const editImg = document.createElement('img');
    editImg.src = editImgPath;
    editImg.alt = "Edit";
    editImg.title = "Edit task";
    editButton.appendChild(editImg);
    editImg.style.width = '100%';
    editImg.style.maxWidth = '25px';
    editImg.style.height = '100%';
    editImg.style.maxHeight = '25px';
    editImg.style.objectFit = 'contain';


    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete-button");
    const delImg = document.createElement('img');
    delImg.src = delImgPath;
    delImg.alt = "Delete";
    delImg.title = "Delete Task";
    deleteButton.appendChild(delImg);
    delImg.style.width = '100%';
    delImg.style.maxWidth = '25px';
    delImg.style.height = '100%';
    delImg.style.maxHeight = '25px';
    delImg.style.objectFit = 'contain';

    // Append elements to the task div
    taskDiv.appendChild(markDone);
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskPriority);
    taskDiv.appendChild(taskDueDate);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);

    // Append the task div to the page
    const emptyDiv = document.getElementById('empty-div');
    emptyDiv.appendChild(taskDiv);

    markDone.addEventListener('change', () => {
        if(markDone.checked) {
            taskTitle.classList.add('completed');
            taskPriority.classList.add('completed');
            taskDueDate.classList.add('completed');
        } else {
            taskTitle.classList.remove('completed');
            taskPriority.classList.remove('completed');
            taskDueDate.classList.remove('completed');
        }
    })

    deleteButton.addEventListener('click', () => {
        deleteTask(taskDiv, taskName, priority, dueDate);
    });

    editButton.addEventListener('click', () => {
        editTask(taskDiv, taskName, priority, dueDate);
    })
}

function deleteTask(taskDiv, taskName, priority, dueDate) {
    taskDiv.remove();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks = tasks.filter(task => !(task.taskName === taskName && task.priority === priority && task.dueDate === dueDate));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(taskDiv, taskName, priority, dueDate) {
    // Hide the current task info
    taskDiv.querySelector('.task-title').style.display = 'none';
    taskDiv.querySelector('.task-priority').style.display = 'none';
    taskDiv.querySelector('.task-due-date').style.display = 'none';

    // Create the form to edit the task
    const newTaskForm = document.createElement('form');
    newTaskForm.id = "edit-task-form";

    const closeButtonEdit = document.createElement('button');
    closeButtonEdit.id = "close-button-edit";
    closeButtonEdit.textContent = "X";
    newTaskForm.appendChild(closeButtonEdit)

    closeButtonEdit.addEventListener("click", () => {
        newTaskForm.style.display = "none";
        newTaskForm.reset();
        taskDiv.querySelector('.task-title').style.display = 'flex';
        taskDiv.querySelector('.task-priority').style.display = 'flex';
        taskDiv.querySelector('.task-due-date').style.display = 'flex';
    })

    // Input for task name
    const taskEditLabel = document.createElement("label");
    taskEditLabel.setAttribute("for", "task");
    taskEditLabel.textContent = "Task: ";
    taskEditLabel.classList.add("task-edit-label")
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.name = "task";
    taskInput.id = "task-input-edit"
    taskInput.value = taskName;
    taskInput.required = true;

    //priority//
    const priorityEditLabel = document.createElement("label");
    priorityEditLabel.setAttribute("for", "priority");
    priorityEditLabel.textContent = "Priority: ";
    priorityEditLabel.classList.add("priority-edit-label")

    // Radio buttons for priority
    const radioEditContainer = document.createElement("div");
    const radioHigh = createRadioButton('High', priority);
    radioHigh.textContent = "High";

    const radioMedium = createRadioButton('Medium', priority);
    radioMedium.textContent = "Medium";

    const radioLow = createRadioButton('Low', priority);
    radioLow.textContent = "Low";

    radioEditContainer.appendChild(radioHigh);
    radioEditContainer.appendChild(radioMedium);
    radioEditContainer.appendChild(radioLow);

    // Input for due date
    const calendarEditLabel = document.createElement("label");
    calendarEditLabel.setAttribute("for", "task-date");
    calendarEditLabel.textContent = "Due Date: ";
    calendarEditLabel.classList.add("calendar-edit-label")
    const calendarInput = document.createElement("input");
    calendarInput.id = "date-task-edit";
    calendarInput.type = "date";
    calendarInput.value = dueDate;

    newTaskForm.appendChild(taskEditLabel);
    newTaskForm.appendChild(taskInput);
    newTaskForm.appendChild(priorityEditLabel);
    newTaskForm.appendChild(radioEditContainer);
    newTaskForm.appendChild(calendarEditLabel);
    newTaskForm.appendChild(calendarInput);

    // Submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Save Changes";
    submitButton.id = "submit-button-edit";
    newTaskForm.appendChild(submitButton);

    // Append the form to the task div (replace current content)
    taskDiv.appendChild(newTaskForm);

    // Handle form submission to update task
    newTaskForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const updatedTaskName = taskInput.value;
        const updatedPriority = document.querySelector('input[name="priority"]:checked')?.value;
        const updatedDueDate = calendarInput.value;

        if (updatedTaskName && updatedPriority && updatedDueDate) {
            // Update task div with new values
            updateTaskDiv(taskDiv, updatedTaskName, updatedPriority, updatedDueDate);
            // Update task in localStorage
            updateTaskInLocalStorage(taskName, priority, dueDate, updatedTaskName, updatedPriority, updatedDueDate);
            newTaskForm.remove();
        } else {
            alert("Please complete all fields!");
        }
    });
}

function createRadioButton(value, selectedPriority) {
    const radioLabel = document.createElement("label");
    radioLabel.textContent = value;
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "priority";
   radioInput.value = value;
    if (value === selectedPriority) {
        radioInput.checked = true;
   }
   return radioLabel.appendChild(radioInput);
}

function updateTaskDiv(taskDiv, taskName, priority, dueDate) {
    // Show the task info again after editing
    taskDiv.querySelector('.task-title').style.display = 'block';
    taskDiv.querySelector('.task-priority').style.display = 'block';
    taskDiv.querySelector('.task-due-date').style.display = 'block';

    // Update the task info with the new values
    taskDiv.querySelector('.task-title').textContent = taskName;
    taskDiv.querySelector('.task-priority').textContent = `Priority: ${priority}`;
    taskDiv.querySelector('.task-due-date').textContent = `Due Date: ${dueDate}`;
}

function updateTaskInLocalStorage(oldTaskName, oldPriority, oldDueDate, updatedTaskName, updatedPriority, updatedDueDate) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks = tasks.map(task => {
        if (task.taskName === oldTaskName && task.priority === oldPriority && task.dueDate === oldDueDate) {
            return {
                taskName: updatedTaskName,
                priority: updatedPriority,
                dueDate: updatedDueDate
            };
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}