import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
  });

  it ('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
