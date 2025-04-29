import { TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { of } from "rxjs";

import { EntryListComponent } from "./entry-list.component";
import { Category } from "../../interfaces/category";
import { Entry } from "../../interfaces/entry";
import { CategoryService } from "../../services/category.service";
import { EntryService } from "../../services/entry.service";
import { LedgerService } from "../../services/ledger.service";

describe('EntryListComponent', () => {
  let component: EntryListComponent;
  let ledgerServiceSpy: jasmine.SpyObj<LedgerService>;
  let entryServiceSpy: jasmine.SpyObj<EntryService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;

  beforeEach(() => {
    ledgerServiceSpy = jasmine.createSpyObj('LedgerService', ['getLedgerById']);
    entryServiceSpy = jasmine.createSpyObj('EntryService', ['getEntries', 'deleteEntry']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);

    TestBed.configureTestingModule({
      imports: [EntryListComponent],
      providers: [
        { provide: LedgerService, useValue: ledgerServiceSpy },
        { provide: EntryService, useValue: entryServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: ActivatedRoute , useValue: { snapshot: { params: { id: 'ledger1' }}} }
      ]
    });

    component = TestBed.createComponent(EntryListComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it ('should get all entries', () => {
      const entries: Entry[] = [
        { id: 'entry1', description: 'Entry 1', amount: 1, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() },
        { id: 'entry2', description: 'Entry 2', amount: 2, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() }
      ];

      entryServiceSpy.getEntries.and.returnValue(of(entries));

      component.ngOnInit();

      expect(entryServiceSpy.getEntries).toHaveBeenCalled();

      const subscription = component.entries?.subscribe((entries) => {
        expect(entries.length).toBe(2);
        expect(entries[0].description).toBe('Entry 1');
        expect(entries[1].description).toBe('Entry 2');
      });

      subscription?.unsubscribe();
    });

    it ('should filter all entries for the selected month', () => {
      const entries: Entry[] = [
        { id: 'entry1', description: 'Entry 1', amount: 1, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date(2025, 0, 1) },
        { id: 'entry2', description: 'Entry 2', amount: 2, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date(2025, 1, 1) }
      ];

      component.selectedDate.next(new Date(2025, 0, 1));
      entryServiceSpy.getEntries.and.returnValue(of(entries));

      component.ngOnInit();

      expect(entryServiceSpy.getEntries).toHaveBeenCalled();

      const subscription = component.filteredEntries?.subscribe((entries) => {
        expect(entries.length).toBe(1);
        expect(entries[0].description).toBe('Entry 1');
      });

      subscription?.unsubscribe();
    });

    it ('should get all categories', () => {
      const categories: Category[] = [
        { id: 'category1', name: 'Category 1', budget: 1, endDate: null, ownerId: 'owner1'},
        { id: 'category2', name: 'Category 2', budget: 2, endDate: null, ownerId: 'owner1'}
      ];

      categoryServiceSpy.getCategories.and.returnValue(of(categories));

      component.ngOnInit();

      expect(categoryServiceSpy.getCategories).toHaveBeenCalled();

      const subscription = component.categories?.subscribe((categories) => {
        expect(categories.length).toBe(2);
        expect(categories[0].name).toBe('Category 1');
        expect(categories[1].name).toBe('Category 2');;
      });

      subscription?.unsubscribe();
    });
  });

  describe('selectEntry', () => {
    it ('should select an entry', () => {
      const entry: Entry = { id: 'entry1', description: 'Entry 1', amount: 1, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() };
    
      component.selectEntry(entry);
    
      expect(component.selectedEntry).toEqual(entry);
    });
  });

  describe('deleteEntry', () => {
    it ('should delete an entry', () => {
      const ledgerId = 'ledger1';
      const entryId = 'entry1';

      component.deleteEntry(entryId);

      expect(entryServiceSpy.deleteEntry).toHaveBeenCalledWith(ledgerId, entryId);
    });
  });
});
