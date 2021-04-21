
//por defecto busca .js
import './styles.css';
////por defecto busca el index.js en classes
import { Todo, TodoList } from './classes'
import { createTodoHtml } from './js/componentes';

export const todoList = new TodoList();
// todoList.todos.forEach(todo => createTodoHtml(todo));
//tip:
todoList.todos.forEach( createTodoHtml );




