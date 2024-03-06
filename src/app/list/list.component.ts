import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../item';
import { TodoServiceModule } from '../todo-service/todo-service.module';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDeleteLeft, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FontAwesomeModule,HttpClientModule,TodoServiceModule, CommonModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  todos:Item[] = []
  private subscription: Subscription = new Subscription();
 itemForm = new FormGroup({
  title:new FormControl(''),
  description: new FormControl('')
 })

 faDelete =faXmark;

  constructor(private todoService:TodoServiceModule){
  }
  ngOnInit(): void {
    this.todoService.todo$.subscribe(todos => this.todos = todos)
    this.todoService.getTodos()

  }

  onSubmit():void{
    const newItem = <Item>{title:this.itemForm.value.title,description:this.itemForm.value.description,
      completed:false}
    if (this.itemForm.valid){
      this.todoService.postTodo(newItem)
      this.itemForm.reset()
      }

  }

  onDelete(item:Item):void{
    this.todoService.deleteTodo(item).subscribe(()=>{
      console.log(`Deleted todo with id ${item.id}`)
    })
  }


  ngOnDestroy(): void {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }        
  }


