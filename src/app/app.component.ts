import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly authService = inject(AuthService);
  
  readonly router = inject(Router);

  burgerMenuActive = false;

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  toggleBurgerMenu() {
    this.burgerMenuActive = !this.burgerMenuActive;
  }
}
