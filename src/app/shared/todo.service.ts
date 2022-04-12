import { Todo } from './todo.model';
import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  todos: Todo[] = [];
  todo: Todo = new Todo('');
  storageListenSub: Subscription = new Subscription();

  constructor() {
    this.loadStateLocalStorage();

    this.storageListenSub = fromEvent(window, 'storage').subscribe(
      (event: any) => {
        if (event.key === 'todos') {
          this.loadStateLocalStorage();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) {
      this.storageListenSub.unsubscribe();
    }
  }

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
    this.saveStateLocalStorage();
  }

  updateTodo(id: any, updatedFields: Partial<Todo>) {
    let todo = this.getTodo(id);
    Object.assign(todo!, updatedFields);
    this.saveStateLocalStorage();
  }

  deleteTodo(id: string | undefined) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return;
    }
    this.todos.splice(todoIndex, 1);
    this.saveStateLocalStorage();
  }

  //save and load data from localStorage

  saveStateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadStateLocalStorage() {
    try {
      const todosInLocalStorage = JSON.parse(
        localStorage.getItem('todos') || `[]`
      );
      this.todos.length = 0;
      this.todos.push(...todosInLocalStorage);
    } catch (error) {
      console.log('There was an error retrieving the notes from localStorage');
      console.log(error);
    }
  }
}
