let ul;
let todoForm;
let todoList;

localStorage.setItem('artur', "greziak");
console.log(localStorage.getItem('artur'));

const getTotoList = () =>{
  if(localStorage.getItem('todoList')){
    todoList = JSON.parse(localStorage.getItem('todoList'))
  } else {
    todoList = [];
  }
}

getTotoList();  

document.addEventListener('DOMContentLoaded', () => {
  ul = document.getElementById('todoList');
  todoForm = document.getElementById('todoForm');
  let todoNameError = document.getElementById('todoNameError');
  let todoDescError = document.getElementById('todoDescError');

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let todoName = event.target.elements[0];
        let todoDesc = event.target.elements[1];

        if(todoName.value.length > 2 && todoDesc.value.length > 20){
          let newTodo = {
          
          name: todoName.value,
          desc: todoDesc.value,
          done: false
        }

        for(let todo of todoList){
          if(todo.name === todoName.value && todo.desc === todoDesc.value){
            return;
          }
        }
          todoList.push(newTodo);
          localStorage.setItem('todoList', JSON.stringify(todoList));
          todoName.value = "";
          todoDesc.value = "";

          renderList();

        } else {
          if(todoName.value.length < 3){
            todoName.classList.add('input-danger');
            todoName.classList.add('input-info-danger');
            todoNameError.innerText = "Nazwa jest za krótka!"
          }

          if(todoDesc.value.length < 20){
            todoDesc.classList.add('input-danger');
            todoName.classList.add('input-info-danger');
            todoDescError.innerText = "Opis jest za krótki, trzeba dodać (min 20 znaków)!"
          }
        }

        if(todoName.value.length > 2){
          todoName.classList.remove('input-danger');
          todoName.classList.remove('input-info-danger');
          todoNameError.innerText = "";
        }

        if(todoDesc.value.length > 20){
          todoDesc.classList.remove('input-danger');
          todoName.classList.remove('input-info-danger');
          todoDescError.innerText = "";
        }
    })
});

const renderList = () =>{
  let liList = Array.from(ul.getElementByTagName('li'));

  liList.forEach((li) => {
    let button = li.getElementByTagName('button')[0];
    button.removeEventListener('click', changeTaskStatus)
  })

  ul.innerHTML = "";

          todoList.forEach((todo, index) => {
            let li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            let main = document.createElement('main');
            let heading = document.createElement('h5');
            let paragraph = document.createElement('p');
            let button = document.createElement('button');

            button.classList.add('btn', 'btn-primary', 'btn-sm');
            button.addEventListener('click', changeTaskStatus)
            button.dataset.taskId = index;

            if(!todo.done){
              button.innerText = "finish";
              button.classList.add('btn', 'btn-success', 'btn-sm');
              } else {
              button.innerText = "revert";
              button.classList.add('btn', 'btn-danger', 'btn-sm');
              main.style.textDecoration = "line-through";
            }

            heading.innerText = todo.name;
            paragraph.innerText = todo.desc;

            main.appendChild(heading);
            main.appendChild(paragraph);

            li.appendChild(main);
            li.appendChild(button);

            ul.appendChild(li);

          });

        }

            const changeTaskStatus = (event) => {
              let todo = todoList[Math.round(event.target.dataset.taskId)];
              if(todo.done === true){
                todo.done = false;
              } else {
                todo.done = true;
              }
              renderList();
            }