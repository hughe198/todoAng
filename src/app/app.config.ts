import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TodoServiceModule } from './todo-service/todo-service.module';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
