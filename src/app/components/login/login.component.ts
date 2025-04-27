import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required })
  });

  invalidCredentials = false;

  async login() {
    const formValid = this.loginForm.valid;
    this.invalidCredentials = false;

    if (formValid) {
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;

      try {
        await this.authService.login(email, password);
        this.router.navigateByUrl('/dashboard');
      }
      catch {
        this.invalidCredentials = true;
      }
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

  get emailEmpty(): boolean {
    const email = this.loginForm.controls.email;
    return email.hasError('required') && email.touched;
  }

  get emailNotValid(): boolean {
    const email = this.loginForm.controls.email;
    return email.hasError('email') && email.touched;
  }

  get passwordEmpty(): boolean {
    const password = this.loginForm.controls.password;
    return password.hasError('required') && password.touched;
  }
}
