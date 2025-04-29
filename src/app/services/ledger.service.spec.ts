import { TestBed } from "@angular/core/testing";

import { LedgerService } from "./ledger.service";

describe('LedgerService', () => {
  let service: LedgerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LedgerService]
    });

    service = TestBed.inject(LedgerService);
  });

  it ('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
