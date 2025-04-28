import { TestBed } from "@angular/core/testing";

import { of } from "rxjs";

import { ArchiveListComponent } from "./archive-list.component";
import { Ledger } from "../../interfaces/ledger";
import { LedgerService } from "../../services/ledger.service";

describe('ArchiveListComponent', () => {
  let component: ArchiveListComponent;
  let ledgerServiceSpy: jasmine.SpyObj<LedgerService>;

  beforeEach(() => {
    ledgerServiceSpy = jasmine.createSpyObj('LedgerService', ['getLedgers', 'restoreLedger']);

    TestBed.configureTestingModule({
      imports: [ArchiveListComponent],
      providers: [
        { provide: LedgerService, useValue: ledgerServiceSpy }
      ]
    });

    component = TestBed.createComponent(ArchiveListComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it ('should get all archived ledgers', () => {
      const ledgers: Ledger[] = [
        { id: 'ledger1', name: 'Ledger 1', description: 'Description 1', 'archived': true, ownerId: 'owner1' },
        { id: 'ledger2', name: 'Ledger 2', description: 'Description 2', 'archived': true, ownerId: 'owner1' }
      ];

      ledgerServiceSpy.getLedgers.and.returnValue(of(ledgers));

      component.ngOnInit();

      expect(ledgerServiceSpy.getLedgers).toHaveBeenCalledWith(true);

      const subscription = component.ledgers?.subscribe((ledgers) => {
        expect(ledgers.length).toBe(2);
        expect(ledgers[0].name).toBe('Ledger 1');
        expect(ledgers[1].name).toBe('Ledger 2');
      });

      subscription?.unsubscribe();
    });
  });

  describe('restoreLedger', () => {
    it ('should restore a ledger', () => {
      const ledgerId = 'ledger1';

      component.restoreLedger(ledgerId);

      expect(ledgerServiceSpy.restoreLedger).toHaveBeenCalledWith(ledgerId);
    });
  });
});
