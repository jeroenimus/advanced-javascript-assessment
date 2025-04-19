import { Component, inject, input, output, viewChild } from '@angular/core';

import { EntryFormComponent } from '../entry-form/entry-form.component';
import { Entry } from '../../interfaces/entry';
import { EntryFormValues } from '../../interfaces/entry-form-values';
import { EntryService } from '../../services/entry.service';

@Component({
  selector: 'app-edit-entry',
  imports: [EntryFormComponent],
  templateUrl: './edit-entry.component.html'
})
export class EditEntryComponent {
  private readonly entryService = inject(EntryService);
  private readonly formRef = viewChild.required(EntryFormComponent);

  ledgerId = input.required<string>();
  entry = input.required<Entry>();
  closeModal = output();

  submitEntry() {
    const formValid = this.formRef().entryForm.valid;

    if (formValid) {
      const formDirty = this.formRef().entryForm.dirty;

      if (formDirty) {
        const formValues: EntryFormValues = this.formRef().entryForm.getRawValue();
        this.entryService.editEntry(this.ledgerId(), this.entry().id, formValues);
      }

      this.closeModal.emit();
    }
    else {
      this.formRef().entryForm.markAllAsTouched();
    }
  }
}
