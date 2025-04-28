import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";

import { AppComponent } from "./app.component";
import { AuthService } from "./services/auth.service";

describe('AppComponent', () => {
  let component: AppComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  
  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    component = TestBed.createComponent(AppComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it ('should logout and navigate to login', async () => {
      authServiceSpy.logout.and.resolveTo();
  
      await component.logout();
      
      expect(authServiceSpy.logout).toHaveBeenCalled();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });
});
