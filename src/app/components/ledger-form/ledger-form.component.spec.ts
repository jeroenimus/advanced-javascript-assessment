import { TestBed } from "@angular/core/testing";

import { LedgerFormComponent } from "./ledger-form.component";

describe('LedgerFormComponent', () => {
  let component: LedgerFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LedgerFormComponent]
    });

    component = TestBed.createComponent(LedgerFormComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
