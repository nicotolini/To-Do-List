// Info date
const dateNumber = document.getElementById(`dateNumber`)
const dateText = document.getElementById(`dateText`)
const dateMonth = document.getElementById(`dateMonth`)
const dateYear = document.getElementById(`dateYear`)
const anchorFiltros = document.querySelectorAll('.filtro');
const ulFiltros = document.querySelector('.filters');
const divTodoList = document.getElementById(`tasksContainer`)

// Task Container
const tasksContainer = document.getElementById(`tasksContainer`)

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString(`es`, { day: `numeric` });
    dateText.textContent = date.toLocaleString(`es`, { weekday: `long` });
    dateMonth.textContent = date.toLocaleString(`es`, { month: `short` });
    dateYear.textContent = date.toLocaleString(`es`, { year: `numeric` });
};
let tasks = [];
let filterSelected = "Todos"



function saveLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function initTasks() {

    let taskLocalStorage = localStorage.getItem("tasks");
    if (!taskLocalStorage) {
        tasks = [];
    } else {
        tasks = JSON.parse(taskLocalStorage);
    }
    renderTasks();
}
function taskCompleted(id) {
    let iTask = tasks.findIndex((task) => task.id == id)
    console.log(iTask)
    tasks[iTask].completed = !tasks[iTask].completed;

    renderTasks();
    saveLocalStorage();
}
function deleteTask(id) {
    tasks = tasks.filter((task)=>task.id != id);
    renderTasks();
    saveLocalStorage();
}
function renderTasks() {
    tasksContainer.innerHTML = " ";
    let filteredTasks = [];
    switch (filterSelected) {
        case `Pendientes`:
            filteredTasks = tasks.filter((task) => !task.completed);
            break;

        case `Completados`:
            filteredTasks = tasks.filter((task) => task.completed);
            break;

        default:
            filteredTasks = tasks;
            break;
    }

    filteredTasks.forEach((task, iTask) => {
        const taskHtml = document.createElement('div');
        const deleteHtml = document.createElement(`div`)
        const taskSpan = document.createElement('span')
        deleteHtml.textContent = `X`
        deleteHtml.classList.add(`delete`)
        taskHtml.classList.add('task', 'roundBorder');
        taskSpan.classList.add(`truncate`)
        if (task.completed) {
            taskHtml.classList.add("completed")
            taskSpan.classList.add(`tachado`)
        }
        taskSpan.innerHTML = task.name
        taskHtml.append(taskSpan)
        taskHtml.append(deleteHtml);
        tasksContainer.prepend(taskHtml);

        deleteHtml.addEventListener("click",()=>{
            deleteTask(task.id);
        })
        taskHtml.addEventListener("click", () => {
            taskCompleted(task.id);
        });
    })
}

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if (value.trim() === "") {
        return;
    }
    const task = {
        name: value,
        completed: false,
        id: new Date().getTime(),
    };
    tasks.push(task);
    saveLocalStorage();
    renderTasks();
    event.target.reset();
};
const order = () => {
    const done = tasks.filter((task) => task.completed);
    const toDo = tasks.filter((task) => !task.completed);

    tasks = [...done, ...toDo];
    saveLocalStorage();
    renderTasks();

}
const renderOrderedTasks = () => {
    order();
}
ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) { return; }
    filterSelected = filtro;
    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');
    renderTasks();
});
initTasks();
setDate();