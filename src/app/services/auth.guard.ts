import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@services/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.authService.clearToken();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
