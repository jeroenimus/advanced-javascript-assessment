import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { LedgerService } from '../../services/ledger.service';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private readonly ledgerService = inject(LedgerService);
  private readonly categoryService = inject(CategoryService);

  activeLedgerCount: Promise<number> | undefined;
  archivedLedgerCount: Promise<number> | undefined;
  categoryCount: Promise<number> | undefined;

  ngOnInit() {
    this.activeLedgerCount = this.ledgerService.getLedgerCount();
    this.archivedLedgerCount = this.ledgerService.getLedgerCount(true);
    this.categoryCount = this.categoryService.getCategoryCount();
  }
}
