import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { AlertService } from '../notify/alert.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  isLoggedIn = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
    this.authService.currentUser$
    .pipe(take(1))
    .subscribe(res => {
      const user = res;
      if(!user) {
        this.isLoggedIn = false;
        this.alertService.presentAlert(
          'Blocked',
          'Please sign in!',
          'You need to sign in to access this page',
          ['OK']
        );
        this.router.navigate(['/home']);
      } else {
        this.isLoggedIn = true;
      }
    });
    return this.isLoggedIn;
  }
}
