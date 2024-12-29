import { Component, inject, output, viewChild } from '@angular/core';

import { LedgerFormComponent } from '../ledger-form/ledger-form.component';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-add-ledger',
  standalone: true,
  imports: [LedgerFormComponent],
  templateUrl: './add-ledger.component.html'
})
export class AddLedgerComponent {
  private ledgerService: LedgerService = inject(LedgerService);
  
  formComponent = viewChild.required(LedgerFormComponent);
  closeModal = output();

  submitLedger() {
    const formValid = this.formComponent().ledgerForm.valid;

    if (formValid) {
      const name = this.formComponent().ledgerForm.value.name!;
      const description = this.formComponent().ledgerForm.value.description!;

      this.ledgerService.addLedger(name, description);
      this.closeModal.emit();
    }
    else {
      this.formComponent().ledgerForm.markAllAsTouched();
    }
  }
}
