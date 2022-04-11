import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [
    trigger('todoItemAnim', [
      transition(':leave', [
        animate(
          200,
          style({
            opacity: 0,
            height: 0,
            marginBottom: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  toggleCompleted(todo: Todo) {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed });
  }

  onEditClick(todo: Todo) {
    this.router.navigateByUrl(`/todos/${todo.id}`);
  }
  onDeleteClick(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
    this.notificationService.show('Todo deleted!');
  }
}
