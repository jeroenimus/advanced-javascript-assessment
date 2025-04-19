import { Component, inject, input, output, viewChild } from '@angular/core';

import { LedgerFormComponent } from '../ledger-form/ledger-form.component';
import { Ledger } from '../../interfaces/ledger';
import { LedgerFormValues } from '../../interfaces/ledger-form-values';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-edit-ledger',
  imports: [LedgerFormComponent],
  templateUrl: './edit-ledger.component.html'
})
export class EditLedgerComponent {
  private readonly ledgerService = inject(LedgerService);
  private readonly formRef = viewChild.required(LedgerFormComponent);

  ledger = input.required<Ledger>();
  closeModal = output();

  submitLedger() {
    const formValid = this.formRef().ledgerForm.valid;

    if (formValid) {
      const formDirty = this.formRef().ledgerForm.dirty;
      
      if (formDirty) {
        const formValues: LedgerFormValues = this.formRef().ledgerForm.getRawValue();
        this.ledgerService.editLedger(this.ledger().id, formValues);
      }

      this.closeModal.emit();
    }
    else {
      this.formRef().ledgerForm.markAllAsTouched();
    }
  }
}
