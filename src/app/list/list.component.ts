import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../item';
import { TodoServiceModule } from '../todo-service/todo-service.module';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HttpClientModule,TodoServiceModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  todos:Item[] = []

  constructor(private todoService:TodoServiceModule){
  }
  ngOnInit(): void {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data
    })
    console.log(this.todos)
  }
}
