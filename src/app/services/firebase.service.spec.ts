import { TestBed } from "@angular/core/testing";

import { FirebaseService } from "./firebase.service";

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseService]
    });

    service = TestBed.inject(FirebaseService);
  });

  it ('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
