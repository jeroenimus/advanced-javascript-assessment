import { Component, inject, output, viewChild } from '@angular/core';

import { LedgerFormComponent } from '../ledger-form/ledger-form.component';
import { LedgerService } from '../../services/ledger.service';

@Component({
    selector: 'app-add-ledger',
    imports: [LedgerFormComponent],
    templateUrl: './add-ledger.component.html'
})
export class AddLedgerComponent {
  private readonly ledgerService = inject(LedgerService);
  
  formComponent = viewChild.required(LedgerFormComponent);
  closeModal = output();

  submitLedger() {
    const formValid = this.formComponent().ledgerForm.valid;

    if (formValid) {
      const formValues = this.formComponent().ledgerForm.getRawValue();

      this.ledgerService.addLedger(formValues.name, formValues.description);
      this.closeModal.emit();
    }
    else {
      this.formComponent().ledgerForm.markAllAsTouched();
    }
  }
}
