import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategoryApiClient } from './api-client.interface';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root', // Автоматическая регистрация провайдера
})
export class MockApiClientService implements ICategoryApiClient {
  private categories: Category[] = [
    { id: 1, name: 'Струнные', parentId: null },
    { id: 2, name: 'Гитары', parentId: 1 },
    { id: 3, name: 'Электрогитары', parentId: 2 },
    { id: 4, name: 'Акустические гитары', parentId: 2 },
    { id: 5, name: 'Бас-гитары', parentId: 2 },
    { id: 6, name: 'Смычковые', parentId: 1 },
    { id: 7, name: 'Скрипки', parentId: 6 },
    { id: 8, name: 'Виолончели', parentId: 6 },
    { id: 9, name: 'Контрабасы', parentId: 6 },
    
    { id: 10, name: 'Ударные', parentId: null },
    { id: 11, name: 'Барабаны', parentId: 10 },
    { id: 12, name: 'Тарелки', parentId: 10 },
    { id: 13, name: 'Электронные ударные установки', parentId: 10 },
  
    { id: 14, name: 'Клавишные', parentId: null },
    { id: 15, name: 'Пианино', parentId: 14 },
    { id: 16, name: 'Синтезаторы', parentId: 14 },
    { id: 17, name: 'Цифровые фортепиано', parentId: 14 },
  
    { id: 18, name: 'Духовые', parentId: null },
    { id: 19, name: 'Трубы', parentId: 18 },
    { id: 20, name: 'Саксофоны', parentId: 18 },
    { id: 21, name: 'Флейты', parentId: 18 },
  
    { id: 22, name: 'Аксессуары', parentId: null },
    { id: 23, name: 'Чехлы для инструментов', parentId: 22 },
    { id: 24, name: 'Струны', parentId: 22 },
    { id: 25, name: 'Медиаторы', parentId: 22 },
    { id: 26, name: 'Стойки', parentId: 22 },
  
    { id: 27, name: 'Оборудование', parentId: null },
    { id: 28, name: 'Комбоусилители', parentId: 27 },
    { id: 29, name: 'Микрофоны', parentId: 27 },
    { id: 30, name: 'Микшерные пульты', parentId: 27 },
  ];

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getChildCategories(parentId: number): number[] {
    const result: number[] = [];
    const collectChildren = (id: number) => {
      const children = this.categories.filter(cat => cat.parentId === id);
      for (const child of children) {
        result.push(child.id);
        collectChildren(child.id); // Рекурсивно добавляем дочерние элементы
      }
    };
    collectChildren(parentId);
    return result;
  }
  
}
