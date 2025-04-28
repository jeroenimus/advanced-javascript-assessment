import { SIGNAL, signalSetFn } from "@angular/core/primitives/signals";
import { TestBed } from "@angular/core/testing";

import { EditLedgerComponent } from "./edit-ledger.component";
import { Ledger } from "../../interfaces/ledger";
import { LedgerFormValues } from "../../interfaces/ledger-form-values";
import { LedgerService } from "../../services/ledger.service";

describe('EditLedgerComponent', () => {
  let component: EditLedgerComponent;
  let ledgerServiceSpy: jasmine.SpyObj<LedgerService>;
  let closeModalSpy: jasmine.Spy;

  beforeEach(() => {
    ledgerServiceSpy = jasmine.createSpyObj('LedgerService', ['editLedger']);

    TestBed.configureTestingModule({
      imports: [EditLedgerComponent],
      providers: [
        { provide: LedgerService, useValue: ledgerServiceSpy }
      ]
    });

    component = TestBed.createComponent(EditLedgerComponent).componentInstance;

    const ledger: Ledger = { id: 'ledger1', name: 'Ledger 1', description: 'Description 1', archived: false, ownerId: 'owner1' };
    signalSetFn(component.ledger[SIGNAL], ledger);

    closeModalSpy = spyOn(component.closeModal, 'emit');
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('submitLedger', () => {
    it ('should edit a ledger and close the modal', () => {
      const ledgerId = 'ledger1';
      const formValues: LedgerFormValues = { name: 'Ledger 1', description: 'Description 1' };
      
      component.formRef().ledgerForm.setValue(formValues);
      component.formRef().ledgerForm.markAsDirty();
      ledgerServiceSpy.editLedger.and.resolveTo();

      component.submitLedger();

      expect(ledgerServiceSpy.editLedger).toHaveBeenCalledWith(ledgerId, formValues);
      expect(closeModalSpy).toHaveBeenCalled();
    });
  });
});
