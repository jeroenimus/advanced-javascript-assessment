import { Pipe, PipeTransform } from '@angular/core';

import { Category } from '../interfaces/category';

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {
  transform(categoryId: string, categories: Category[] | null): string {
    if (!categories) { return ''; }
    return categories.find(category => category.id === categoryId)?.name ?? '';
  }
}
