import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { Router } from '@angular/router';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input('todo') todo: Todo = new Todo('');
  @Output() editClick: EventEmitter<void> = new EventEmitter();
  @Output() deleteClick: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router, private todoService: TodoService) {}

  ngOnInit(): void {}

  onEdit() {
    this.editClick.emit();
  }

  onDelete() {
    this.deleteClick.emit();
  }
}
