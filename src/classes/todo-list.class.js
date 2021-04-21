
import { Todo } from './index';

export class TodoList {

    constructor(){
        // this.todos= [];
        this.cargarTodosLocalStorage();
    }

    addTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }
    deleteTodo( id ){
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }
    markCompleted( id ) {
        for (const todo of this.todos) {
            if (id == todo.id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }
    deleteCompleted() {
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }
    cargarTodosLocalStorage() {
        this.todos =    ( localStorage.getItem('todo') ) 
                        ? this.todos = JSON.parse(localStorage.getItem('todo')) 
                        : this.todos = [];
        this.todos= this.todos.map( Todo.fromJson );
    }
}