import { TestBed } from "@angular/core/testing";

import { AddLedgerComponent } from "./add-ledger.component";
import { LedgerFormValues } from "../../interfaces/ledger-form-values";
import { LedgerService } from "../../services/ledger.service";

describe('AddLedgerComponent', () => {
  let component: AddLedgerComponent;
  let ledgerServiceSpy: jasmine.SpyObj<LedgerService>;
  let closeModalSpy: jasmine.Spy;

  beforeEach(() => {
    ledgerServiceSpy = jasmine.createSpyObj('LedgerService', ['addLedger']);

    TestBed.configureTestingModule({
      imports: [AddLedgerComponent],
      providers: [
        { provide: LedgerService, useValue: ledgerServiceSpy }
      ]
    });

    component = TestBed.createComponent(AddLedgerComponent).componentInstance;
    closeModalSpy = spyOn(component.closeModal, 'emit');
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('submitLedger', () => {
    it ('should add a ledger and close the modal', () => {
      const formValues: LedgerFormValues = { name: 'Ledger 1', description: 'Description 1' };
      
      component.formRef().ledgerForm.setValue(formValues);
      ledgerServiceSpy.addLedger.and.resolveTo();

      component.submitLedger();

      expect(ledgerServiceSpy.addLedger).toHaveBeenCalledWith(formValues);
      expect(closeModalSpy).toHaveBeenCalled();
    });
  });
});
