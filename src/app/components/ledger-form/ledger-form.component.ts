import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-ledger-form',
    imports: [ReactiveFormsModule],
    templateUrl: './ledger-form.component.html'
})
export class LedgerFormComponent {
  ledgerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  get nameEmpty(): boolean {
    const name = this.ledgerForm.get('name');
    return name!.hasError('required') && name!.touched;
  }
}
