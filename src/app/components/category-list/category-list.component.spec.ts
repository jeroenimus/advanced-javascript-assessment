import { TestBed } from "@angular/core/testing";

import { of } from "rxjs";

import { CategoryListComponent } from "./category-list.component";
import { Category } from "../../interfaces/category"
import { Entry } from "../../interfaces/entry";
import { CategoryService } from "../../services/category.service";
import { EntryService } from "../../services/entry.service";

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let entryServiceSpy: jasmine.SpyObj<EntryService>;

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories', 'deleteCategory']);
    entryServiceSpy = jasmine.createSpyObj('EntryService', ['getEntriesByCategory']);

    TestBed.configureTestingModule({
      imports: [CategoryListComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: EntryService, useValue: entryServiceSpy }
      ]
    });

    component = TestBed.createComponent(CategoryListComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it ('should get categories with entries', () => {
      const categories: Category[] = [
        { id: 'category1', name: 'Category 1', budget: 1, endDate: null, ownerId: 'owner1' },
        { id: 'category2', name: 'Category 2', budget: 2, endDate: null, ownerId: 'owner1' }
      ];

      const categoriesWithEntries: Record<string, Entry[]> = {
        'category1': [
          { id: 'entry1', description: 'Entry 1', amount: 1, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() },
          { id: 'entry2', description: 'Entry 2', amount: 2, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() }
        ],
        'category2': [
          { id: 'entry3', description: 'Entry 3', amount: 3, type: 'credit', categoryId: 'category2', ownerId: 'owner1', createdOn: new Date() },
          { id: 'entry4', description: 'Entry 4', amount: 4, type: 'credit', categoryId: 'category2', ownerId: 'owner1', createdOn: new Date() },
          { id: 'entry5', description: 'Entry 5', amount: 5, type: 'credit', categoryId: 'category2', ownerId: 'owner1', createdOn: new Date() }
        ]
      };

      categoryServiceSpy.getCategories.and.returnValue(of(categories));
      entryServiceSpy.getEntriesByCategory.withArgs('category1').and.returnValue(of(categoriesWithEntries['category1']));
      entryServiceSpy.getEntriesByCategory.withArgs('category2').and.returnValue(of(categoriesWithEntries['category2']));

      component.ngOnInit();

      expect(categoryServiceSpy.getCategories).toHaveBeenCalled();

      const subscription = component.categoriesWithEntries?.subscribe((categoriesWithEntries) => {
        expect(categoriesWithEntries.length).toBe(2);

        expect(categoriesWithEntries[0].category.name).toBe('Category 1');
        expect(categoriesWithEntries[0].entries.length).toBe(2);
        expect(categoriesWithEntries[0].entries[0].description).toBe('Entry 1');

        expect(categoriesWithEntries[1].category.name).toBe('Category 2');
        expect(categoriesWithEntries[1].entries.length).toBe(3);
        expect(categoriesWithEntries[1].entries[1].description).toBe('Entry 4');
      });

      subscription?.unsubscribe();
    });
  });

  describe('selectCategory', () => {
    it ('should select a category', () => {
      const category: Category = { id: 'category1', name: 'Category 1', budget: 1, endDate: null, ownerId: 'owner1' };

      component.selectCategory(category);

      expect(component.selectedCategory).toEqual(category);
    });
  });

  describe('deleteCategory', () => {
    it ('should delete a category', () => {
      const categoryId = 'category1';

      component.deleteCategory(categoryId);

      expect(categoryServiceSpy.deleteCategory).toHaveBeenCalledWith(categoryId);
    });
  });
});
