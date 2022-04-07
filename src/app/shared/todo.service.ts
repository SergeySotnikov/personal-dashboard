import { Todo } from './todo.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  todo: Todo = new Todo('');

  constructor() {}

  getTodos() {
    return this.todos;
  }

  getTodo(id: string | null) {
    this.todos.forEach((todo) => {
      if (todo.id === id) {
        this.todo = todo;
      }
    });
    return this.todo;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  updateTodo(id: any, updatedFields: Partial<Todo>) {
    let todo = this.getTodo(id);
    Object.assign(todo!, updatedFields);
  }

  deleteTodo(id: string | undefined) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return;
    }
    this.todos.splice(todoIndex, 1);
  }
}
