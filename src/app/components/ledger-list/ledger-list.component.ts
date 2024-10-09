import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { Ledger } from '../../interfaces/ledger';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-ledger-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ledger-list.component.html'
})
export class LedgerListComponent implements OnInit {
  private ledgerService: LedgerService = inject(LedgerService);

  ledgers!: Observable<Ledger[]>;

  ngOnInit() {
    this.ledgers = this.ledgerService.getActiveLedgers();
  }
}
