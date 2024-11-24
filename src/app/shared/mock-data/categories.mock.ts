import { Category } from '../models/category.model';

export const categories: Category[] = [
  // Основные категории инструментов
  { id: 1, name: 'Струнные', parentId: null },
  { id: 2, name: 'Гитары', parentId: 1 },
  { id: 3, name: 'Электрогитары', parentId: 2 },
  { id: 4, name: 'Акустические гитары', parentId: 2 },
  { id: 5, name: 'Классические гитары', parentId: 2 },
  { id: 6, name: 'Бас-гитары', parentId: 2 },
  { id: 7, name: 'Арфы', parentId: 1 },
  { id: 8, name: 'Скрипки', parentId: 1 },
  { id: 9, name: 'Виолончели', parentId: 1 },
  { id: 10, name: 'Контрабасы', parentId: 1 },

  { id: 11, name: 'Ударные', parentId: null },
  { id: 12, name: 'Барабаны', parentId: 11 },
  { id: 13, name: 'Тарелки', parentId: 11 },
  { id: 14, name: 'Электронные ударные установки', parentId: 11 },
  { id: 15, name: 'Палки для барабанов', parentId: 11 },

  { id: 16, name: 'Клавишные', parentId: null },
  { id: 17, name: 'Пианино', parentId: 16 },
  { id: 18, name: 'Синтезаторы', parentId: 16 },
  { id: 19, name: 'Органы', parentId: 16 },
  { id: 20, name: 'Цифровые фортепиано', parentId: 16 },

  { id: 21, name: 'Духовые', parentId: null },
  { id: 22, name: 'Трубачи', parentId: 21 },
  { id: 23, name: 'Саксофоны', parentId: 21 },
  { id: 24, name: 'Тромбоны', parentId: 21 },
  { id: 25, name: 'Флейты', parentId: 21 },
  { id: 26, name: 'Кларнеты', parentId: 21 },
  
  { id: 27, name: 'Прочее', parentId: null },
  { id: 28, name: 'Микрофоны', parentId: 27 },
  { id: 29, name: 'Акустические системы', parentId: 27 },
  { id: 30, name: 'Процессоры эффектов', parentId: 27 },
  { id: 31, name: 'Тюнеры', parentId: 27 },

  { id: 32, name: 'Муз. аксессуары', parentId: null },
  { id: 33, name: 'Чехлы и сумки для инструментов', parentId: 32 },
  { id: 34, name: 'Стойки для инструментов', parentId: 32 },
  { id: 35, name: 'Кабели и адаптеры', parentId: 32 },
  { id: 36, name: 'Педали для эффектов', parentId: 32 }
];
