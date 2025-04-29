import { TestBed } from "@angular/core/testing";

import { CategoryFormComponent } from "./category-form.component";

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryFormComponent]
    });

    component = TestBed.createComponent(CategoryFormComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
