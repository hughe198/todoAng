import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Item } from '../../item';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[]
})

export class TodoServiceModule {
  constructor(private http:HttpClient) { }

  baseUrl = "http://127.0.0.1:8000"

  getTodos(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/todos`)
      .pipe(
        catchError(error => {
          console.error('Error fetching todos:', error);
          return throwError(error);
        })
      );
  }

  getTodo(item_id:string):Observable<Item[]>{
    return this.http.get<Item[]>(`${this.baseUrl}/todos/${item_id}`)
  }

  postTodo(newItem:Item):Observable<Item>{
    return this.http.post<Item>(`${this.baseUrl}/todos/`,newItem)
  }

  putTodo(newItem:Item):Observable<Item>{
    return this.http.put<Item>(`${this.baseUrl}/todos/`,newItem)
  }

  deleteTodo(todo:Item):Observable<any>{
    return this.http.delete(`${this.baseUrl}/todos/${todo.id}`)
  }
  



}