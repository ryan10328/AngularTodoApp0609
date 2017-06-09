import { Observable } from 'rxjs/Observable';
import 'rxjs/rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const BASE_URL: string = 'http://localhost:3000/todos';

@Injectable()
export class DataService {

  constructor(private http: Http) {
  }

  getTodos(): Observable<any[]> {
    return this.http.get(BASE_URL).map(data => data.json());
  }

  addTodo(todo: string): Observable<any[]> {
    return this.http.post(BASE_URL, { todo: todo, done: false })
      .concatMap(x => this.getTodos());
  }

  deleteTodo(item): Observable<any[]> {
    return this.http.delete(`${BASE_URL}/${item.id}`)
      .concatMap(data => this.getTodos())
  }

  toggleTodo(item): Observable<any[]> {
    return this.http.put(`${BASE_URL}/${item.id}`, { todo: item.todo, done: item.done })
      .concatMap(data => this.getTodos());
  }

  clearCompleted(todos): Observable<any[]> {
    let requestLists: any[] = [];

    todos.forEach(item => {

      let obs = this.http.delete(`${BASE_URL}/${item.id}`);
      requestLists.push(obs);

    });

    return Observable.forkJoin(requestLists)
      .concatMap(data => this.getTodos());
  }

  toggleAll(todos): Observable<any[]> {
    let requestLists: any[] = [];

    todos.forEach(item => {
      let obs = this.http.put(`${BASE_URL}/${item.id}`, { todo: item.todo, done: item.done });
      requestLists.push(obs);
    });

    return Observable.forkJoin(requestLists)
      .concatMap(data => this.getTodos());
  }

}
