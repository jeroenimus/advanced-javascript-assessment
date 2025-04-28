import { TestBed } from "@angular/core/testing";

import { EntryFormComponent } from "./entry-form.component";

describe('EntryFormComponent', () => {
  let component: EntryFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EntryFormComponent]
    });

    component = TestBed.createComponent(EntryFormComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
