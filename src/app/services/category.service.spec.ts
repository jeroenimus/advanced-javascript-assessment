import { TestBed } from "@angular/core/testing";

import { CategoryService } from "./category.service";

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
  });

  it ('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
