import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from '../interfaces/entry';

@Pipe({
  name: 'balance'
})
export class BalancePipe implements PipeTransform {
  transform(entries: Entry[] | null): number {
    if (!entries) { return 0; }

    return entries.reduce((total, entry) => {
      return total + (entry.type === 'credit' ? entry.amount : -entry.amount );
    }, 0);
  }
}
