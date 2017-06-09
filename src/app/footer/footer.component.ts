import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {
  // moreThanFive: boolean;
  constructor() { }

  // @Input('todos') myTodos: any[] = [];
  private _todos: any[] = [];

  get todos() {
    return this._todos;
  }

  @Input() set todos(value) {
    this._todos = value;
  }

  @Output() onClearCompleted = new EventEmitter();

  clearCompleted() {
    this.onClearCompleted.emit();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    // this.moreThanFive = this.todos.length >= 5;
  }

  hello() {
    console.log('Hello, Angular');
  }

}
