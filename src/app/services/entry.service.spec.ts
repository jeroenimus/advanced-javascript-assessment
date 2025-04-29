import { TestBed } from "@angular/core/testing";

import { EntryService } from "./entry.service";

describe('EntryService', () => {
  let service: EntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryService]
    });

    service = TestBed.inject(EntryService);
  });

  it ('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
