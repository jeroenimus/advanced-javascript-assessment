import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {
  transform(value: number, type: 'credit' | 'debit'): string {
    return type === 'credit' ? `+${value.toFixed(2)}` : `-${value.toFixed(2)}`;
  }
}
