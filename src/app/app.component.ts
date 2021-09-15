import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IonMenu, ModalController } from '@ionic/angular';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RegisterModalComponent } from './shared/auth/register-modal/register-modal.component';
import { SignInModalComponent } from './shared/auth/sign-in-modal/sign-in-modal.component';
import { User } from './shared/models/user.model';
import { AuthService } from './shared/auth/auth.service';
import { ToastService } from './shared/notify/toast.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild(IonMenu) ionMenu: IonMenu;
  currentUser = null;
  userFullName = null;
  currentUser$: Observable<User>;
  ngUnsubscribe = new Subject<void>();
  isAdmin: false;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'paw'
    },
    {
      title: 'About Kangals',
      url: '/about-kangals',
      icon: 'information-circle'
    },
    {
      title: 'Purchase Kangals',
      url: '/purchase-kangals',
      icon: 'heart'
    }
  ];
  constructor(
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    // !! implement if need to replace afAuth code below > this.getCurrentUser()
    this.initializeAuth();
  }

  ngAfterViewInit() {}

  async initializeAuth() {
    this.getCurrentUser();

    this.afAuth.onAuthStateChanged(async user => {
      // console.log('Auth Service current user: ',user);
      this.currentUser = user;
      console.log('app component user: ', this.currentUser);
      await user.getIdTokenResult().then(async (res) =>{
        this.isAdmin = await res.claims.admin;
        console.log('app component admin idTokenResult is: ', this.isAdmin);
      });
    });
  }

  getCurrentUser() {
    this.currentUser$ = this.authService.user$;
    this.currentUser$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
      if(data) {
        this.userFullName = data.firstName + ' ' + data.lastName;
      } else {
        this.userFullName = null;
      }
      console.log('app component getCurrentUser = ', this.userFullName);
    });
  }

  closeMenu() {
    this.ionMenu.close();
  }

  async presentRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: RegisterModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  async presentSignInModal() {
    const modal = await this.modalCtrl.create({
      component: SignInModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  async signOut() {
    await this.authService.signOut()
    .then(async () => {
      await this.toastService.presentToast(
        'You Have Signed Out.',
        'middle',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('dismiss toast message');
            this.router.navigate(['/home']);
          }
        }],
        3000
      );
      this.router.navigate(['/home']);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
