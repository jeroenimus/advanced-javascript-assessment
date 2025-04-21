import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Observable, combineLatest, map, switchMap } from 'rxjs';

import { AddCategoryComponent } from '../add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { Category } from '../../interfaces/category';
import { Entry } from '../../interfaces/entry';
import { BalancePipe } from '../../pipes/balance.pipe';
import { PercentagePipe } from '../../pipes/percentage.pipe';
import { CategoryService } from '../../services/category.service';
import { EntryService } from '../../services/entry.service';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, AddCategoryComponent, EditCategoryComponent, BalancePipe, PercentagePipe],
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly entryService = inject(EntryService);

  categoriesWithEntries: Observable<{ category: Category, entries: Entry[] }[]> | undefined;
  selectedCategory: Category | undefined;
  addModalActive = false;
  editModalActive = false;

  ngOnInit() {
    this.categoriesWithEntries = this.categoryService.getCategories().pipe(
      switchMap(categories => this.withEntries(categories))
    );
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id);
  }

  toggleAddModal() {
    this.addModalActive = !this.addModalActive;
  }

  toggleEditModal() {
    this.editModalActive = !this.editModalActive;
  }

  private withEntries(categories: Category[]): Observable<{ category: Category, entries: Entry[] }[]> {
    const categoriesWithEntries = categories.map(category =>
      this.entryService.getEntriesByCategory(category.id).pipe(
        map(entries => ({ category, entries }))
      )
    );

    return combineLatest(categoriesWithEntries);
  }
}
