import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

import { AddEntryComponent } from '../add-entry/add-entry.component';
import { EditEntryComponent } from '../edit-entry/edit-entry.component';
import { Category } from '../../interfaces/category';
import { Entry } from '../../interfaces/entry';
import { AmountPipe } from '../../pipes/amount.pipe';
import { BalancePipe } from '../../pipes/balance.pipe';
import { CategoryNamePipe } from '../../pipes/category-name.pipe';
import { CategoryService } from '../../services/category.service';
import { EntryService } from '../../services/entry.service';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-entry-list',
  imports: [CommonModule, RouterModule, AddEntryComponent, EditEntryComponent, AmountPipe, BalancePipe, CategoryNamePipe],
  templateUrl: './entry-list.component.html'
})
export class EntryListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly ledgerService = inject(LedgerService);
  private readonly entryService = inject(EntryService);
  private readonly categoryService = inject(CategoryService);
  
  readonly ledgerId = this.route.snapshot.params['id'];

  entries: Observable<Entry[]> | undefined;
  filteredEntries: Observable<Entry[]> | undefined;
  categories: Observable<Category[]> | undefined;
  selectedDate = new BehaviorSubject<Date>(new Date());
  selectedEntry: Entry | undefined;
  ledgerName: string | undefined;
  ledgerDescription: string | undefined;
  addModalActive = false;
  editModalActive = false;

  ngOnInit() {
    this.loadLedgerDetails();

    this.entries = this.entryService.getEntries(this.ledgerId);
    this.filteredEntries = combineLatest([this.entries, this.selectedDate]).pipe(
      map(([entries, filterDate]) => this.filterEntries(entries, filterDate))
    );

    this.categories = this.categoryService.getCategories();
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

  selectEntry(entry: Entry) {
    this.selectedEntry = entry;
  }

  deleteEntry(entryId: string) {
    this.entryService.deleteEntry(this.ledgerId, entryId);
  }

  toggleAddModal() {
    this.addModalActive = !this.addModalActive;
  }

  toggleEditModal() {
    this.editModalActive = !this.editModalActive;
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
