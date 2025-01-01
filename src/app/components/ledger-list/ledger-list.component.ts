import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { AddLedgerComponent } from '../add-ledger/add-ledger.component';
import { EditLedgerComponent } from '../edit-ledger/edit-ledger.component';
import { Ledger } from '../../interfaces/ledger';
import { LedgerService } from '../../services/ledger.service';

@Component({
    selector: 'app-ledger-list',
    imports: [CommonModule, AddLedgerComponent, EditLedgerComponent],
    templateUrl: './ledger-list.component.html'
})
export class LedgerListComponent implements OnInit {
  private ledgerService = inject(LedgerService);

  ledgers: Observable<Ledger[]> | undefined;
  selectedLedger: Ledger | undefined;
  addModalActive = false;
  editModalActive = false;

  ngOnInit() {
    this.ledgers = this.ledgerService.getLedgers();
  }

  selectLedger(ledger: Ledger) {
    this.selectedLedger = ledger;
  }

  archiveLedger(id: string) {
    this.ledgerService.archiveLedger(id);
  }

  toggleAddModal() {
    this.addModalActive = !this.addModalActive;
  }

  toggleEditModal() {
    this.editModalActive = !this.editModalActive;
  }
}
