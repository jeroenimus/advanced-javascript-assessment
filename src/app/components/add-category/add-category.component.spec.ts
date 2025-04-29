import { TestBed } from "@angular/core/testing";

import { AddCategoryComponent } from "./add-category.component";
import { CategoryFormValues } from "../../interfaces/category-form-values";
import { CategoryService } from "../../services/category.service";

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let closeModalSpy: jasmine.Spy;

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['addCategory']);

    TestBed.configureTestingModule({
      imports: [AddCategoryComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy }
      ]
    });

    component = TestBed.createComponent(AddCategoryComponent).componentInstance;
    closeModalSpy = spyOn(component.closeModal, 'emit');
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('submitCategory', () => {
    it ('should add a category and close the modal', () => {
      const formValues: CategoryFormValues = { name: 'Category 1', budget: '1', endDate: '' };

      component.formRef().categoryForm.setValue(formValues);
      categoryServiceSpy.addCategory.and.resolveTo();

      component.submitCategory();

      expect(categoryServiceSpy.addCategory).toHaveBeenCalledWith(formValues);
      expect(closeModalSpy).toHaveBeenCalled();
    });
  })
});
