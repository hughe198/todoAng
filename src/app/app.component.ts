import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent} from './list/list.component'; 
import { ItemComponent } from './list/item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoServiceModule } from './todo-service/todo-service.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent,ItemComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoAng';
}
