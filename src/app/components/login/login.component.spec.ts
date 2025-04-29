import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";

import { LoginComponent } from "./login.component";
import { AuthService } from "../../services/auth.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }        
      ]
    });

    component = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it ('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it ('should login and navigate to dashboard', async () => {
      component.loginForm.setValue({ email: 'jasmine@test.com', password: 'password' });
      authServiceSpy.login.and.resolveTo();

      await component.login();

      expect(authServiceSpy.login).toHaveBeenCalledWith('jasmine@test.com', 'password');
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/dashboard');
      expect(component.invalidCredentials).toBeFalse();
    });

    it ('should fail login', async () => {
      component.loginForm.setValue({ email: 'jasmine@test.com', password: 'invalid' });
      authServiceSpy.login.and.rejectWith();

      await component.login();

      expect(authServiceSpy.login).toHaveBeenCalledWith('jasmine@test.com', 'invalid');
      expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
      expect(component.invalidCredentials).toBeTrue();
    });
  });
});
