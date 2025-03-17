import { saveTaskToLocalStorage } from "./localStorage";
import { createTaskDiv } from "./createTaskDivs";

function addNewTask() {
        //popup form that'll get info//
        const newTaskForm = document.createElement('form');
        newTaskForm.id = "new-task-form";

        const emptyDiv = document.getElementById("empty-div");
        emptyDiv.appendChild(newTaskForm);

        const closeButton = document.createElement('button');
        closeButton.id = "close-button";
        closeButton.textContent = "X";
        newTaskForm.appendChild(closeButton)

        closeButton.addEventListener("click", () => {
            newTaskForm.style.display = "none";
            newTaskForm.reset();
        })

        //textbox//
        const taskLabel = document.createElement("label");
        taskLabel.setAttribute("for", "task");
        taskLabel.textContent = "Task: ";
        taskLabel.classList.add("task-label")
        const taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.id = "task-input";
        taskInput.name = "task";
        taskInput.required = true;

        //radio input//
        const priorityLabel = document.createElement("label");
        priorityLabel.setAttribute("for", "priority");
        priorityLabel.textContent = "Priority: ";
        priorityLabel.classList.add("priority-label")

        const radioContainer = document.createElement('div');
        radioContainer.classList.add("radio-container");
        //radio buttons//
        const radioHigh = document.createElement("label");
        radioHigh.textContent = "High";
        const radioInputHigh = document.createElement("input");
        radioInputHigh.type = "radio";
        radioInputHigh.id = "radio-high";
        radioInputHigh.value = "High";
        radioInputHigh.name = "priority";

        const radioMedium = document.createElement("label");
        radioMedium.textContent = "Medium";
        const radioInputMedium = document.createElement("input");
        radioInputMedium.type = "radio";
        radioInputMedium.id = "radio-medium";
        radioInputMedium.value = "Medium";
        radioInputMedium.name = "priority";

        const radioLow = document.createElement("label");
        radioLow.textContent = "Low";
        const radioInputLow = document.createElement("input");
        radioInputLow.type = "radio";
        radioInputLow.id = "radio-low";
        radioInputLow.value = "Low";
        radioInputLow.name = "priority";
        
        //append radio buttons to radio container//
        radioContainer.appendChild(radioHigh);
        radioContainer.appendChild(radioInputHigh);
        radioContainer.appendChild(radioMedium);
        radioContainer.appendChild(radioInputMedium);
        radioContainer.appendChild(radioLow);
        radioContainer.appendChild(radioInputLow);

        //calendar//
        const calendarLabel = document.createElement("label");
        calendarLabel.setAttribute("for", "task-date");
        calendarLabel.textContent = "Due Date: ";
        calendarLabel.classList.add("calendar-label")

        const calendarInput = document.createElement("input");
        calendarInput.type = "date";
        calendarInput.id = "task-date";
        calendarInput.name = "due-date";

        //So that they can only select a future date//
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;

        const todayDate = `${year}-${month}-${day}`;
        calendarInput.min = todayDate;

        //append to the form div//
        newTaskForm.appendChild(taskLabel);
        newTaskForm.appendChild(taskInput);
        newTaskForm.appendChild(priorityLabel);
        newTaskForm.appendChild(radioContainer);
        newTaskForm.appendChild(calendarLabel);
        newTaskForm.appendChild(calendarInput);

        //submit info//
        const submitButton = document.createElement("button");
        submitButton.textContent = "Create Task";
        newTaskForm.appendChild(submitButton);
        submitButton.classList.add("submit-button")

        //To prevent losing info on page reload//
        newTaskForm.addEventListener("submit", function(e) { // 'e' represents the event object, which is the info about the event, like "click" or where the event happens (submit button)//
            e.preventDefault(); //prevents page from reloading on submit//
            
            // Get data from the form//
            const taskName = document.querySelector("#task-input").value;
            const priority = document.querySelector('input[name="priority"]:checked')?.value;
            const dueDate = calendarInput.value;
    
            // Create a div to represent the task
            if (taskName && priority && dueDate) {
                createTaskDiv(taskName, priority, dueDate);
                saveTaskToLocalStorage(taskName, priority, dueDate);
            } else {
                alert("Please complete all fields!")
            }
            newTaskForm.style.display = "none";
            // Reset the form after submitting
            newTaskForm.reset();
        });
}

export default addNewTask;