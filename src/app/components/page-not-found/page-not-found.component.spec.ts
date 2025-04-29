import { TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { PageNotFoundComponent } from "./page-not-found.component";

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PageNotFoundComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    });

    component = TestBed.createComponent(PageNotFoundComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
