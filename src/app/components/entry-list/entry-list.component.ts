import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Observable } from 'rxjs';

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
  ledgerName: string | undefined;
  ledgerDescription: string | undefined;

  ngOnInit() {
    this.loadLedger();
    this.entries = this.entryService.getEntries(this.ledgerId);
  }

  private async loadLedger() {
    try {
      const ledger = await this.ledgerService.getLedgerById(this.ledgerId);
      this.ledgerName = ledger?.name;
      this.ledgerDescription = ledger?.description;
    }
    catch (error) { console.error(error); }
  }
}
