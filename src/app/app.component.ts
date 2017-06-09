import { FooterComponent } from './footer/footer.component';
import { Component, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/rx";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) {
    this.getTodos()
      .subscribe(data => this.todos = data);
  }

  // @ViewChild('myFooter') footer: FooterComponent;
  isToggleAll: boolean = false;
  selectType: string = 'all';
  inputHint: string = 'What needs to be done??';
  colspan: number = 2;

  todo: string;
  todos: any[] = [];


  getTodos(): Observable<any[]> {
    return this.http.get('http://localhost:3000/todos/')
      .map(x => x.json());
  }

  addTodo() {
    if (this.todo) {

      this.http.post('http://localhost:3000/todos', { todo: this.todo, done: false })
        .concatMap(x => this.getTodos())
        .subscribe(data => this.todos = data);
      // let input = evt.target as HTMLInputElement;
      // this.todos = [...this.todos, { todo: this.todo, done: false }];
      // input.value = '';
      this.todo = '';
    }
  }

  clearCompleted(evt) {
    this.todos = this.todos.filter(x => x.done);

    let requestLists: any[] = [];

    this.todos.forEach(item => {

      let obs = this.http.delete(`http://localhost:3000/todos/${item.id}`);
      requestLists.push(obs);

    });

    Observable.forkJoin(requestLists)
      .concatMap(data => this.getTodos())
      .subscribe(data => this.todos = data);
    // this.footer.hello();
  }

  onSelectType(evt) {
    this.selectType = evt;
  }

  toggleAll() {
    this.todos = this.todos.map(item => {
      return item.done === this.isToggleAll ?
        { todo: item.todo, done: item.done, id: item.id } :
        { todo: item.todo, done: !item.done, id: item.id };
    });
    let requestLists: any[] = [];

    this.todos.forEach(item => {
      let obs = this.http.put(`http://localhost:3000/todos/${item.id}`, { todo: item.todo, done: item.done });
      requestLists.push(obs);
    });

    Observable.forkJoin(requestLists)
      .concatMap(data => this.getTodos())
      .subscribe(data => this.todos = data);

  }

  deleteTodo(item) {
    // this.todos = this.todos.filter(x => x != item);
    this.http.delete(`http://localhost:3000/todos/${item.id}`)
      .concatMap(data => this.getTodos())
      .subscribe(data => this.todos = data);
  }

  toggleTodo(item) {
    this.http.put(`http://localhost:3000/todos/${item.id}`, { todo: item.todo, done: item.done })
      .concatMap(data => this.getTodos())
      .subscribe(data => this.todos = data);
  }
}
