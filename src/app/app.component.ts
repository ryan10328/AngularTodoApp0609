import { DataService } from './data.service';
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

  constructor(private http: Http, private dataService: DataService) {
    this.dataService.getTodos()
      .subscribe(data => this.todos = data);
  }

  // @ViewChild('myFooter') footer: FooterComponent;
  isToggleAll: boolean = false;
  selectType: string = 'all';
  inputHint: string = 'What needs to be done??';
  colspan: number = 2;

  todo: string;
  todos: any[] = [];


  // getTodos(): Observable<any[]> {
  //   return this.http.get('http://localhost:3000/todos/')
  //     .map(x => x.json());
  // }

  addTodo() {
    if (this.todo) {

      this.dataService.addTodo(this.todo)
        .subscribe(data => this.todos = data);
      // let input = evt.target as HTMLInputElement;
      // this.todos = [...this.todos, { todo: this.todo, done: false }];
      // input.value = '';
      this.todo = '';
    }
  }

  deleteTodo(item) {
    // this.todos = this.todos.filter(x => x != item);
    this.dataService.deleteTodo(item)
      .subscribe(data => this.todos = data);
  }

  toggleTodo(item) {
    this.dataService.toggleTodo(item)
      .subscribe(data => this.todos = data);
  }

  clearCompleted(evt) {
    this.todos = this.todos.filter(x => x.done);
    this.dataService.clearCompleted(this.todos).subscribe(data => this.todos = data);;
    // let requestLists: any[] = [];

    // this.todos.forEach(item => {

    //   let obs = this.http.delete(`http://localhost:3000/todos/${item.id}`);
    //   requestLists.push(obs);

    // });

    // Observable.forkJoin(requestLists)
    //   .concatMap(data => this.getTodos())
    //   .subscribe(data => this.todos = data);
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

    this.dataService.toggleAll(this.todos).subscribe(data => this.todos = data);
    // let requestLists: any[] = [];

    // this.todos.forEach(item => {
    //   let obs = this.http.put(`http://localhost:3000/todos/${item.id}`, { todo: item.todo, done: item.done });
    //   requestLists.push(obs);
    // });

    // Observable.forkJoin(requestLists)
    //   .concatMap(data => this.getTodos())
    //   .subscribe(data => this.todos = data);

  }


}
