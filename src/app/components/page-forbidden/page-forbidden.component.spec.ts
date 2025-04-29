import { TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { PageForbiddenComponent } from "./page-forbidden.component";

describe('PageForbiddenComponent', () => {
  let component: PageForbiddenComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PageForbiddenComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    });

    component = TestBed.createComponent(PageForbiddenComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
