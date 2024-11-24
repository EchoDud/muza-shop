import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Путь к маршрутам
import { HomeComponent } from './app/components/pages/home/home.component';

bootstrapApplication(HomeComponent, {
  providers: [
    provideRouter(routes) // Используем provideRouter для настройки маршрутов
  ]
}).catch((err) => console.error(err));
