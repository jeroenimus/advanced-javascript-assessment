import { TestBed } from "@angular/core/testing";

import { CategoryListComponent } from "./category-list.component";
import { Category } from "../../interfaces/category"
import { CategoryService } from "../../services/category.service";;

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['deleteCategory']);

    TestBed.configureTestingModule({
      imports: [CategoryListComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy }
      ]
    });

    component = TestBed.createComponent(CategoryListComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
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
