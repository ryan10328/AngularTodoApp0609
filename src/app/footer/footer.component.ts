import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {
  // moreThanFive: boolean;

  // @Input('todos') myTodos: any[] = [];
  private _todos: any[] = [];

  get todos() {
    return this._todos;
  }

  @Input() set todos(value) {
    this._todos = value;
  }


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    // this.moreThanFive = this.todos.length >= 5;
  }

}
