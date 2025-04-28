import { SIGNAL, signalSetFn } from "@angular/core/primitives/signals";
import { TestBed } from "@angular/core/testing";

import { EditEntryComponent } from "./edit-entry.component";
import { Entry } from "../../interfaces/entry";
import { EntryFormValues } from "../../interfaces/entry-form-values";
import { EntryService } from "../../services/entry.service";

describe('EditEntryComponent', () => {
  let component: EditEntryComponent;
  let entryServiceSpy: jasmine.SpyObj<EntryService>;
  let closeModalSpy: jasmine.Spy;

  beforeEach(() => {
    entryServiceSpy = jasmine.createSpyObj('EntryService', ['editEntry']);

    TestBed.configureTestingModule({
      imports: [EditEntryComponent],
      providers: [
        { provide: EntryService, useValue: entryServiceSpy }
      ]
    });

    component = TestBed.createComponent(EditEntryComponent).componentInstance;

    signalSetFn(component.ledgerId[SIGNAL], 'ledger1');

    const entry: Entry = { id: 'entry1', description: 'Entry 1', amount: 1, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() };
    signalSetFn(component.entry[SIGNAL], entry);
    
    signalSetFn(component.categories[SIGNAL], []);

    closeModalSpy = spyOn(component.closeModal, 'emit');
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('submitEntry', () => {
    it ('should edit an entry and close the modal', () => {
      const ledgerId = 'ledger1';
      const entryId = 'entry1';
      const formValues: EntryFormValues = { description: 'Entry 1', amount: '1', type: 'credit', categoryId: 'category1' };

      component.formRef().entryForm.setValue(formValues);
      component.formRef().entryForm.markAsDirty();
      entryServiceSpy.editEntry.and.resolveTo();

      component.submitEntry();
      
      expect(entryServiceSpy.editEntry).toHaveBeenCalledWith(ledgerId, entryId, formValues);
      expect(closeModalSpy).toHaveBeenCalled();
    });
  });
});
