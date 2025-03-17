export function saveTaskToLocalStorage(taskName, priority, dueDate) {

    const task = {
        taskName: taskName,
        priority: priority,
        dueDate: dueDate
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    return tasks;
}