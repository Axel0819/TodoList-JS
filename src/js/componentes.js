
import { Todo } from "../classes";
import { todoList } from "../index"

//Referencias HTML
const divTodoList = document.querySelector( '.todo-list' );
const txtInput = document.querySelector( '.new-todo' );
const btnCompletados = document.querySelector( '.clear-completed' );
const ulFilters = document.querySelector( '.filters' );
const anchorFilters = document.querySelectorAll( '.filtro')

export const createTodoHtml = ( todo ) =>{

    const todoHTML = `<li class=" ${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
                            <div class="view">
                                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
                                <label>${ todo.tarea }</label>
                                <button class="destroy"></button>
                            </div>
                        <input class="edit" value="Create a TodoMVC template">
                    </li>`;

    const div = document.createElement( 'div' );
    div.innerHTML = todoHTML;
    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

//Eventos: keyup->cuando suelto tecla
txtInput.addEventListener( 'keyup', ( evento ) => {
    
    if (evento.keyCode === 13  && txtInput.value.length > 0) {
        const nuevoTodo = new Todo( txtInput.value );
        todoList.addTodo( nuevoTodo );
        createTodoHtml( nuevoTodo );
        txtInput.value = '';
        // console.log(todoList);
    }
});

divTodoList.addEventListener( 'click', (evento) =>{
    //obtiene el nombre del tag que se toca dentro del ul
    const nombreElemento = evento.target.localName;//input, label, button
    const todoElemento = evento.target.parentElement.parentElement;//obtiene el elemento padre(li)
    const idElemento = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {//click en el input(check)
        todoList.markCompleted( idElemento );
        //añade y quita: dinamico
        todoElemento.classList.toggle('completed');

    }else if (nombreElemento.includes('button')){
        todoList.deleteTodo( idElemento );
        divTodoList.removeChild( todoElemento );
    }
});

btnCompletados.addEventListener('click',() =>{
    todoList.deleteCompleted();
    
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild( elemento );
        }
    }
})

ulFilters.addEventListener( 'click', (evento)=> {
    const filtro = evento.target.text;
    if ( !filtro ) { return; }

    anchorFilters.forEach( elemento => elemento.classList.remove('selected'));
    evento.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {

            case 'Pendientes':
                if ( completado ){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if ( !completado ){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }

})