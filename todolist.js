var tasks = []

var statusType = ["открыта", "в работе", "решена"]

var todoListDiv = `<div id="tododiv">
    <form name="filter" onsubmit="filterTasks(event)">
    </form>
    <p>
        <button onclick="addTask()">Добавить задачу</button>
    </p>
</div>`

var addTaskDiv = `<div id="addtaskdiv">
    <form name="addtask" onsubmit="showTodoList(event)">
        <p><input id="todotitle" type="text" placeholder="Заголовок"></p>
        <p><textarea id="tododescr" rows="10" cols="45" name="text" placeholder="Описание"></textarea></p>     
    </form>
</div>`

function deleteTask(index)
{
    tasks.splice(index, 1);

    let div = document.getElementById("tododiv");
    div.remove();

    createTodoList(tasks);
}

function clearFilter()
{
    let div = document.getElementById("tododiv");
    div.remove();

    createTodoList(tasks);
}

function filterTasks(event)
{
    event.preventDefault();

    let index = event.target.filterstatus.options.selectedIndex;
    let status = event.target.filterstatus.options[index].value;
    
    let filtered = tasks.filter(task => task.status === status);

    let div = document.getElementById("tododiv");
    div.remove();

    createTodoList(filtered);
}

function addTask()
{
    let div = document.getElementById("tododiv");
    div.remove();

    createAddForm();
}

function showTodoList(event)
{
    event.preventDefault();

    let title = document.forms.addtask.todotitle.value;
    let descr = document.forms.addtask.tododescr.value;

    let selected = document.forms.addtask.todostatus.options.selectedIndex;
    let status = document.forms.addtask.todostatus.options[selected].value;

    tasks.push({title: title, descr: descr, status: status});
    
    let div = document.getElementById("addtaskdiv");
    div.remove();

    createTodoList(tasks);
}

function createTodoList(tasksToShow)
{
    document.body.insertAdjacentHTML('afterbegin', todoListDiv);
    
    let div = document.getElementById('tododiv');

    let select = document.createElement('select');
    select.id = "filterstatus";
    document.forms.filter.append(select);

    statusType.forEach(status => {
        let option = document.createElement('option');
        option.setAttribute('value', status);
        option.append(status);
        select.append(option);
    });

    document.forms.filter.insertAdjacentHTML('beforeend', `<input type="submit" value="Отфильтровать">`);
    document.forms.filter.insertAdjacentHTML('beforeend', `<input type="button" value="Сбросить фильтр" onclick="clearFilter()">`);

    tasksToShow.forEach((task, index) => {
        var taskhtml = `<p>${task.title}</p><p>${task.descr}</p><p>${task.status}</p><button onclick="deleteTask(${index})">Удалить задачу</button>`
        div.insertAdjacentHTML('beforeend', taskhtml);
    });
}

function createAddForm()
{
    document.body.insertAdjacentHTML('afterbegin', addTaskDiv);
    
    let select = document.createElement('select');
    select.id = "todostatus";
    document.forms.addtask.append(select);

    statusType.forEach(status => {
        let option = document.createElement('option');
        option.setAttribute('value', status);
        option.append(status);
        select.append(option);
    });

    document.forms.addtask.insertAdjacentHTML('beforeend', `<input type="submit" value="Добавить задачу">`);
}

createTodoList(tasks);
