import { Component, OnInit, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { numberValidator } from '../../directives/number-validator.directive';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-entry-form',
  imports: [ReactiveFormsModule],
  templateUrl: './entry-form.component.html'
})
export class EntryFormComponent implements OnInit {
  categories = input.required<Category[] | null>();

  entryDescription = input<string>('');
  entryAmount = input<number>(0);
  entryType = input<string>('credit');
  entryCategoryId = input<string>('');

  entryForm = new FormGroup({
    description: new FormControl('', { nonNullable: true }),
    amount: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.min(1), numberValidator()] }),
    type: new FormControl('credit', { nonNullable: true }),
    categoryId: new FormControl('', { nonNullable: true })
  });

  ngOnInit() {
    this.entryForm.setValue({
      description: this.entryDescription(),
      amount: this.entryAmount() ? this.entryAmount().toString() : '',
      type: this.entryType(),
      categoryId: this.entryCategoryId()
    });
  }

  get amountEmpty(): boolean {
    const amount = this.entryForm.controls.amount;
    return amount.hasError('required') && amount.touched;
  }

  get amountNotNumeric(): boolean {
    const amount = this.entryForm.controls.amount;
    return amount.hasError('notNumeric') && amount.touched;
  }

  get amountTooLow(): boolean {
    const amount = this.entryForm.controls.amount;
    return amount.hasError('min') && amount.touched;
  }
}
