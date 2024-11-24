import { Category } from '../models/category.model';

export const categories: Category[] = [
  { id: 1, name: 'Гитары', parentId: 6 },
  { id: 2, name: 'Электрогитары', parentId: 1 },
  { id: 3, name: 'Акустические гитары', parentId: 1 },
  { id: 4, name: 'Ударные', parentId: null },
  { id: 5, name: 'Барабаны', parentId: 4 },
  { id: 6, name: 'Струнные', parentId: null },
];
