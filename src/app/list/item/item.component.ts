import { Component, OnInit } from '@angular/core';
import { Item } from '../../../item';
import { TodoServiceModule } from '../../todo-service/todo-service.module';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [TodoServiceModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent{

constructor(){
}

todo:Item[] = []


}
