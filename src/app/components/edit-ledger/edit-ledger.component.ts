import { Component, inject, input, output, viewChild } from '@angular/core';

import { LedgerFormComponent } from '../ledger-form/ledger-form.component';
import { Ledger } from '../../interfaces/ledger';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-edit-ledger',
  imports: [LedgerFormComponent],
  templateUrl: './edit-ledger.component.html'
})
export class EditLedgerComponent {
  private readonly ledgerService = inject(LedgerService);

  formComponent = viewChild.required(LedgerFormComponent);
  ledger = input.required<Ledger>();
  closeModal = output();

  submitLedger() {
    const formValid = this.formComponent().ledgerForm.valid;

    if (formValid) {
      const formDirty = this.formComponent().ledgerForm.dirty;
      
      if (formDirty) {
        const formValues = this.formComponent().ledgerForm.getRawValue();
        
        this.ledgerService.editLedger(this.ledger().id, formValues.name, formValues.description);
      }

      this.closeModal.emit();
    }
    else {
      this.formComponent().ledgerForm.markAllAsTouched();
    }
  }
}
