import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { AlertService } from '../notify/alert.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  isAdmin = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
      this.authService.isAdmin$
      .pipe(take(1))
      .subscribe(res => {
        const adminRole = res;
        if(!adminRole) {
          this.isAdmin = false;
          this.alertService.presentAlert(
            'Blocked',
            'You are not authorized!',
            'You must be signed in & have administrative privileges.',
            ['OK']
          );
          this.router.navigate(['/home']);
        } else {
          this.isAdmin = true;
        }
      });
    return this.isAdmin;
  }
}
