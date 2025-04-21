import { Component, inject, input,output, viewChild } from '@angular/core';

import { CategoryFormComponent } from '../category-form/category-form.component';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { CategoryFormValues } from '../../interfaces/category-form-values';

@Component({
  selector: 'app-edit-category',
  imports: [CategoryFormComponent],
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly formRef = viewChild.required(CategoryFormComponent);

  category = input.required<Category>();
  closeModal = output();

  submitCategory() {
    const formValid = this.formRef().categoryForm.valid;

    if (formValid) {
      const formDirty = this.formRef().categoryForm.dirty;

      if (formDirty) {
        const formValues: CategoryFormValues = this.formRef().categoryForm.getRawValue();
        this.categoryService.editCategory(this.category().id, formValues);
      }

      this.closeModal.emit();
    }
    else {
      this.formRef().categoryForm.markAllAsTouched();
    }
  }
}
