import { FooterComponent } from './footer/footer.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild('myFooter') footer: FooterComponent;

  inputHint: string = 'What needs to be done??';
  colspan: number = 2;

  todo: string;
  todos: any[] = [];

  addTodo(evt: KeyboardEvent) {
    let input = evt.target as HTMLInputElement;
    this.todos = [...this.todos, { todo: this.todo, done: false }];
    input.value = '';
  }

  clearCompleted(evt) {
    this.todos = this.todos.filter(x => !x.done);
    // this.footer.hello();
  }
}
