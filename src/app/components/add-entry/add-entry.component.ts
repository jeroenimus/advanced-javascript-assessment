import { Component, inject, input, output, viewChild } from '@angular/core';

import { EntryFormComponent } from '../entry-form/entry-form.component';
import { EntryService } from '../../services/entry.service';
import { EntryFormValues } from '../../interfaces/entry-form-values';

@Component({
  selector: 'app-add-entry',
  imports: [EntryFormComponent],
  templateUrl: './add-entry.component.html'
})
export class AddEntryComponent {
  private readonly entryService = inject(EntryService);
  
  ledgerId = input.required<string>();
  formRef = viewChild.required(EntryFormComponent);
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
