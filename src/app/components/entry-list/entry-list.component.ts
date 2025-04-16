import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

import { Entry } from '../../interfaces/entry';
import { AmountPipe } from '../../pipes/amount.pipe';
import { BalancePipe } from '../../pipes/balance.pipe';
import { EntryService } from '../../services/entry.service';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-entry-list',
  imports: [CommonModule, RouterModule, AmountPipe, BalancePipe],
  templateUrl: './entry-list.component.html'
})
export class EntryListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly ledgerService = inject(LedgerService);
  private readonly entryService = inject(EntryService);
  private readonly ledgerId = this.route.snapshot.params['id'];

  entries: Observable<Entry[]> | undefined;
  filteredEntries: Observable<Entry[]> | undefined;
  ledgerName: string | undefined;
  ledgerDescription: string | undefined;
  selectedDate = new BehaviorSubject<Date>(new Date());

  ngOnInit() {
    this.loadLedgerDetails();
    this.entries = this.entryService.getEntries(this.ledgerId);
    this.filteredEntries = combineLatest([this.entries, this.selectedDate]).pipe(
      map(([entries, filterDate]) => this.filterEntries(entries, filterDate))
    );
  }

  changeMonth(offset: number) {
    const newDate = new Date(this.selectedDate.value);
    newDate.setMonth(newDate.getMonth() + offset);

    this.selectedDate.next(newDate);
  }

  setCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const selectedMonth = this.selectedDate.value.getMonth();
    const selectedYear = this.selectedDate.value.getFullYear();

    if (currentMonth !== selectedMonth || currentYear !== selectedYear) {
      this.selectedDate.next(currentDate);
    }
  }

  private async loadLedgerDetails() {
    try {
      const ledger = await this.ledgerService.getLedgerById(this.ledgerId);
      this.ledgerName = ledger?.name;
      this.ledgerDescription = ledger?.description;
    }
    catch (error) { console.error(error); }
  }

  private filterEntries(entries: Entry[], filter: Date): Entry[] {
    const filterMonth = filter.getMonth();
    const filterYear = filter.getFullYear();

    return entries.filter(entry => {
      const entryMonth = entry.createdOn.getMonth();
      const entryYear = entry.createdOn.getFullYear();

      return entryMonth === filterMonth && entryYear === filterYear;
    });
  }
}
