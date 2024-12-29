import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { AddLedgerComponent } from '../add-ledger/add-ledger.component';
import { Ledger } from '../../interfaces/ledger';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-ledger-list',
  standalone: true,
  imports: [CommonModule, AddLedgerComponent],
  templateUrl: './ledger-list.component.html'
})
export class LedgerListComponent implements OnInit {
  private ledgerService: LedgerService = inject(LedgerService);

  ledgers: Observable<Ledger[]> | undefined;
  addModalActive: boolean = false;

  ngOnInit() {
    this.ledgers = this.ledgerService.getLedgers();
  }

  toggleAddModal() {
    this.addModalActive = !this.addModalActive;
  }
}
