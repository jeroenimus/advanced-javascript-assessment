import { Component, inject, input, output, viewChild } from '@angular/core';

import { EntryFormComponent } from '../entry-form/entry-form.component';
import { Category } from '../../interfaces/category';
import { EntryFormValues } from '../../interfaces/entry-form-values';
import { EntryService } from '../../services/entry.service';

@Component({
  selector: 'app-add-entry',
  imports: [EntryFormComponent],
  templateUrl: './add-entry.component.html'
})
export class AddEntryComponent {
  private readonly entryService = inject(EntryService);
  private readonly formRef = viewChild.required(EntryFormComponent);

  ledgerId = input.required<string>();
  categories = input.required<Category[] | null>();
  closeModal = output();

  submitEntry() {
    const formValid = this.formRef().entryForm.valid;

    if (formValid) {
      const formValues: EntryFormValues = this.formRef().entryForm.getRawValue();
      
      this.entryService.addEntry(this.ledgerId(), formValues);
      this.closeModal.emit();
    }
    else {
      this.formRef().entryForm.markAllAsTouched();
    }
  }
}
