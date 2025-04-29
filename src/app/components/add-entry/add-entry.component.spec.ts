import { SIGNAL, signalSetFn } from "@angular/core/primitives/signals";
import { TestBed } from "@angular/core/testing";

import { AddEntryComponent } from "./add-entry.component";
import { EntryFormValues } from "../../interfaces/entry-form-values";
import { EntryService } from "../../services/entry.service";

describe('AddEntryComponent', () => {
  let component: AddEntryComponent;
  let entryServiceSpy: jasmine.SpyObj<EntryService>;
  let closeModalSpy: jasmine.Spy;

  beforeEach(() => {
    entryServiceSpy = jasmine.createSpyObj('EntryService', ['addEntry']);

    TestBed.configureTestingModule({
      imports: [AddEntryComponent],
      providers: [
        { provide: EntryService, useValue: entryServiceSpy }
      ]
    });

    component = TestBed.createComponent(AddEntryComponent).componentInstance;
    
    signalSetFn(component.ledgerId[SIGNAL], 'ledger1');
    signalSetFn(component.categories[SIGNAL], []);
    
    closeModalSpy = spyOn(component.closeModal, 'emit');
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('submitEntry', () => {
    it ('should add an entry and close the modal', () => {
      const ledgerId = 'ledger1';
      const formValues: EntryFormValues = { description: 'Entry 1', amount: '1', type: 'credit', categoryId: 'category1' };

      component.formRef().entryForm.setValue(formValues);
      entryServiceSpy.addEntry.and.resolveTo();

      component.submitEntry();

      expect(entryServiceSpy.addEntry).toHaveBeenCalledWith(ledgerId, formValues);
      expect(closeModalSpy).toHaveBeenCalled();
    });
  });
});
