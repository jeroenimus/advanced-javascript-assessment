import { Component, OnInit, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-ledger-form',
    imports: [ReactiveFormsModule],
    templateUrl: './ledger-form.component.html'
})
export class LedgerFormComponent implements OnInit {
  ledgerName = input<string>('');
  ledgerDescription = input<string>('');

  ledgerForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true })
  });

  ngOnInit() {
    this.ledgerForm.setValue({
      name: this.ledgerName(),
      description: this.ledgerDescription()
    });
  }

  get nameEmpty(): boolean {
    const name = this.ledgerForm.controls.name;
    return name.hasError('required') && name.touched;
  }
}
