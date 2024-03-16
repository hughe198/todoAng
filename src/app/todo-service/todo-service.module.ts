import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { Item } from '../../item';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[]
})

export class TodoServiceModule {
  private baseUrl = environment.apiUrl    
  private todoSubject  = new BehaviorSubject<Item[]>([]);
  public todo$ = this.todoSubject.asObservable();

  constructor(private http:HttpClient) { }


  getTodos(): void {
    this.http.get<Item[]>(`${this.baseUrl}/todos`)
      .pipe(
        catchError(error => {
          console.error('Error fetching todos:', error);
          return throwError(() => error);
        }),
        tap((todos:Item[])=>this.todoSubject.next(todos))  // Update our BehaviorSubject with the fetched todos
        )
      .subscribe();
  }

  
  postTodo(newItem:Item):void{
   this.http.post<Item>(`${this.baseUrl}/todos/`,newItem).pipe(
    tap(()=> this.getTodos()) //After adding a new todo, fetch the list again
   ).subscribe()
  }
  
  putTodo(newItem:Item):void{
    this.http.put<Item>(`${this.baseUrl}/todos/`,newItem)
    .pipe(
    tap(()=>this.getTodos())) // After updating, fetch the list again
    .subscribe()
  }
  
  deleteTodo(todo:Item):Observable<any>{
    return this.http.delete(`${this.baseUrl}/todos/${todo.id}`).pipe(
      tap(()=>{
        const updateTodos = this.todoSubject.getValue().filter(item => item.id !== todo.id)
        this.todoSubject.next(updateTodos)
      })
    )
  }
  
  getTodo(item_id:string):void{
    this.http.get<Item[]>(`${this.baseUrl}/todos/${item_id}`)
    .pipe(
      tap(()=>this.getTodos()))
    .subscribe()
  }
  
  
  
}