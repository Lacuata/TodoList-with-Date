const todoList =  JSON.parse(localStorage.getItem('todoList')) || [];

const handleSubmit = () =>{
    event.preventDefault();
    // todo name
    const inputData = document.querySelector('.js-todo')
    const name = inputData.value;
    // todo date
    const inputDate = document.querySelector('.js-date')
    const date = inputDate.value;
    // if name or date empty don't submit 
    if(!name || !date){
        return;
    }
    // push date and name to todoList as an object
    todoList.push({
        name,
        date,
        completed: false
    })
    // after submitting reset data and date to empty string
    inputData.value = ''
    inputDate.value = ''
    console.log(todoList);

    showTodo();
}

// show TodoList
const showTodo = () => {
    let todoListHTML = ''
    const renderWebpage = document.querySelector('.js-todo-added')

    for(var i =0; i < todoList.length; i++){
        const todoListObject = todoList[i]

        const {name ,date, completed} = todoListObject;

        todoListHTML += `
        <div><input type='checkbox' ${completed ? 'checked' : ''} onchange='checkBox(${i})' >${name}</div>
        <div>${date}</div>
        <button class='btn btn-danger' onclick='handleDelete(${i})'>Delete</button>

        `
    }
    renderWebpage.innerHTML  = todoListHTML
    storeTodo();
}



const handleDelete = (i) => {
    todoList.splice(i, 1);
    showTodo();
}


const storeTodo = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

showTodo();

const checkBox = (i) => {
    todoList[i].completed  = !todoList[i].completed
    showTodo();

    setTimeout(() => {
        todoList.splice(i, 1);
        showTodo()
    }, 1000)
}