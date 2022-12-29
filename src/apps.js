// Info date
const dateNumber = document.getElementById(`dateNumber`)
const dateText = document.getElementById(`dateText`)
const dateMonth = document.getElementById(`dateMonth`)
const dateYear = document.getElementById(`dateYear`)
const anchorFiltros   = document.querySelectorAll('.filtro');
const ulFiltros       = document.querySelector('.filters');
const divTodoList = document.getElementById(`tasksContainer`)

// Task Container
const tasksContainer = document.getElementById(`tasksContainer`)

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString(`es`,{ day: `numeric`});
    dateText.textContent = date.toLocaleString(`es`,{ weekday: `long`});
    dateMonth.textContent = date.toLocaleString(`es`,{ month: `short`});
    dateYear.textContent = date.toLocaleString(`es`,{ year: `numeric`});
};

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if (value.trim() === "") {
        return;}
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState)
    task.textContent = value;
    tasksContainer.prepend(task);
    event.target.reset();
};

const changeTaskState = event => {
    event.target.classList.toggle('completed');
};
const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach( el => {
        el.classList.contains('completed') ? done.push(el) : toDo.push(el)
    })
    return [...toDo, ...done];
}

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el))
}


ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;

    if( !filtro ){ return; }

    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro) {
            case 'Pendientes' :
                if(completado) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados' :
                if(!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});

setDate();