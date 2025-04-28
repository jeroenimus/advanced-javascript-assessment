import { TestBed } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";
import { CategoryService } from "../../services/category.service";
import { LedgerService } from "../../services/ledger.service";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let ledgerServiceSpy: jasmine.SpyObj<LedgerService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;

  beforeEach(() => {
    ledgerServiceSpy = jasmine.createSpyObj('LedgerService', ['getLedgerCount']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategoryCount']);

    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: LedgerService, useValue: ledgerServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy }
      ]
    });
    
    component = TestBed.createComponent(DashboardComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it ('should get active ledger count', async () => {
      ledgerServiceSpy.getLedgerCount.and.resolveTo(1);

      component.ngOnInit();

      expect(ledgerServiceSpy.getLedgerCount).toHaveBeenCalled();
      expect(await component.activeLedgerCount).toBe(1);
    });

    it ('should get archived ledger count', async () => {
      ledgerServiceSpy.getLedgerCount.and.resolveTo(2);

      component.ngOnInit();

      expect(ledgerServiceSpy.getLedgerCount).toHaveBeenCalledWith(true);
      expect(await component.archivedLedgerCount).toBe(2);
    });

    it ('should get category count', async () => {
      categoryServiceSpy.getCategoryCount.and.resolveTo(3);

      component.ngOnInit();

      expect(categoryServiceSpy.getCategoryCount).toHaveBeenCalled();
      expect(await component.categoryCount).toBe(3);
    });
  });
});
