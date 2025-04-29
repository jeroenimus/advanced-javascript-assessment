import { Component, inject, output, viewChild } from '@angular/core';

import { LedgerFormComponent } from '../ledger-form/ledger-form.component';
import { LedgerFormValues } from '../../interfaces/ledger-form-values';
import { LedgerService } from '../../services/ledger.service';

@Component({
    selector: 'app-add-ledger',
    imports: [LedgerFormComponent],
    templateUrl: './add-ledger.component.html'
})
export class AddLedgerComponent {
  private readonly ledgerService = inject(LedgerService);
  
  readonly formRef = viewChild.required(LedgerFormComponent);
  
  closeModal = output();

  submitLedger() {
    const formValid = this.formRef().ledgerForm.valid;

    if (formValid) {
      const formValues: LedgerFormValues = this.formRef().ledgerForm.getRawValue();
      
      this.ledgerService.addLedger(formValues);
      this.closeModal.emit();
    }
    else {
      this.formRef().ledgerForm.markAllAsTouched();
    }
  }
}
