import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { Ledger } from '../../interfaces/ledger';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-archive-list',
  imports: [CommonModule],
  templateUrl: './archive-list.component.html'
})
export class ArchiveListComponent implements OnInit {
  private readonly ledgerService = inject(LedgerService);

  ledgers: Observable<Ledger[]> | undefined;

  ngOnInit() {
    this.ledgers = this.ledgerService.getLedgers(true);
  }

  restoreLedger(id: string) {
    this.ledgerService.restoreLedger(id);
  }
}
