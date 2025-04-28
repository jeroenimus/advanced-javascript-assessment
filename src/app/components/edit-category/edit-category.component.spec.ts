import { SIGNAL, signalSetFn } from "@angular/core/primitives/signals";
import { TestBed } from "@angular/core/testing";

import { EditCategoryComponent } from "./edit-category.component";
import { Category } from "../../interfaces/category";
import { CategoryFormValues } from "../../interfaces/category-form-values";
import { CategoryService } from "../../services/category.service";

describe('EditCategoryComponent', () => {
  let component: EditCategoryComponent;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let closeModalSpy: jasmine.Spy;

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['editCategory']);

    TestBed.configureTestingModule({
      imports: [EditCategoryComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy }
      ]
    });

    component = TestBed.createComponent(EditCategoryComponent).componentInstance;

    const category: Category = { id: 'category1', name: 'Category 1', budget: 1, endDate: null, ownerId: 'owner1' };
    signalSetFn(component.category[SIGNAL], category);

    closeModalSpy = spyOn(component.closeModal, 'emit');
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('submitCategory', () => {
    it ('should edit a category and close the modal', () => {
      const categoryId = 'category1';
      const formValues: CategoryFormValues = { name: 'Category 1', budget: '1', endDate: '' };

      component.formRef().categoryForm.setValue(formValues);
      component.formRef().categoryForm.markAsDirty();
      categoryServiceSpy.editCategory.and.resolveTo();

      component.submitCategory();

      expect(categoryServiceSpy.editCategory).toHaveBeenCalledWith(categoryId, formValues);
      expect(closeModalSpy).toHaveBeenCalled();
    });
  });
});
