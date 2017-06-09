import { FooterComponent } from './footer/footer.component';
import { Component, ViewChild } from '@angular/core';
import { Http } from "@angular/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) {

  }

  // @ViewChild('myFooter') footer: FooterComponent;
  isToggleAll: boolean = false;
  selectType: string = 'all';
  inputHint: string = 'What needs to be done??';
  colspan: number = 2;

  todo: string;
  todos: any[] = [];

  addTodo() {
    if (this.todo) {
      // let input = evt.target as HTMLInputElement;
      this.todos = [...this.todos, { todo: this.todo, done: false }];
      // input.value = '';
      this.todo = '';
    }
  }

  clearCompleted(evt) {
    this.todos = this.todos.filter(x => !x.done);
    // this.footer.hello();
  }

  onSelectType(evt) {
    this.selectType = evt;
  }

  toggleAll() {
    this.todos = this.todos.map(item => {
      return item.done === this.isToggleAll ?
        { todo: item.todo, done: item.done } :
        { todo: item.todo, done: !item.done };
    });
  }

  deleteTodo(item) {
    this.todos = this.todos.filter(x => x != item);
  }
}
