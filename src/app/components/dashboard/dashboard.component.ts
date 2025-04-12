import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { LedgerService } from '../../services/ledger.service';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private readonly ledgerService = inject(LedgerService);

  activeLedgerCount: Promise<number> | undefined;
  archivedLedgerCount: Promise<number> | undefined;

  ngOnInit() {
    this.activeLedgerCount = this.ledgerService.getLedgerCount();
    this.archivedLedgerCount = this.ledgerService.getLedgerCount(true);
  }
}
