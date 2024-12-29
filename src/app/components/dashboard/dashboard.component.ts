import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private ledgerService: LedgerService = inject(LedgerService);

  activeLedgerCount!: Promise<number>;
  archivedLedgerCount!: Promise<number>;

  ngOnInit() {
    this.activeLedgerCount = this.ledgerService.getLedgerCount();
    this.archivedLedgerCount = this.ledgerService.getLedgerCount(true);
  }
}
