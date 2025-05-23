import { CommonModule } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { numberValidator } from '../../directives/number-validator.directive';

@Component({
  selector: 'app-category-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  categoryName = input<string>('');
  categoryBudget = input<number>(0);
  categoryEndDate = input<Date | null>(null);

  categoryForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    budget: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.min(1), numberValidator()] }),
    endDate: new FormControl('', { nonNullable: true })
  });

  ngOnInit() {
    this.categoryForm.setValue({
      name: this.categoryName(),
      budget: this.categoryBudget() ? this.categoryBudget().toString() : '',
      endDate: this.categoryEndDate()?.toISOString().split('T')[0] ?? ''
    });
  }

  get nameEmpty(): boolean {
    const name = this.categoryForm.controls.name;
    return name.hasError('required') && name.touched;
  }

  get budgetEmpty(): boolean {
    const budget = this.categoryForm.controls.budget;
    return budget.hasError('required') && budget.touched;
  }

  get budgetNotNumeric(): boolean {
    const budget = this.categoryForm.controls.budget;
    return budget.hasError('notNumeric') && budget.touched;
  }

  get budgetTooLow(): boolean {
    const budget = this.categoryForm.controls.budget;
    return budget.hasError('min') && budget.touched;
  }

  get currentDate(): Date {
    return new Date();
  }
}
