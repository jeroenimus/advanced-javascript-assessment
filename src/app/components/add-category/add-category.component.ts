import { Component, inject, output, viewChild } from '@angular/core';

import { CategoryFormComponent } from '../category-form/category-form.component';
import { CategoryService } from '../../services/category.service';
import { CategoryFormValues } from '../../interfaces/category-form-values';

@Component({
  selector: 'app-add-category',
  imports: [CategoryFormComponent],
  templateUrl: './add-category.component.html'
})
export class AddCategoryComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly formRef = viewChild.required(CategoryFormComponent);

  closeModal = output();

  submitCategory() {
    const formValid = this.formRef().categoryForm.valid;

    if (formValid) {
      const formValues: CategoryFormValues = this.formRef().categoryForm.getRawValue();

      this.categoryService.addCategory(formValues);
      this.closeModal.emit();
    }
    else {
      this.formRef().categoryForm.markAllAsTouched();
    }
  }
}
