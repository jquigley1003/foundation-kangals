import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonMenu, ModalController } from '@ionic/angular';

import { RegisterModalComponent } from './shared/auth/register-modal/register-modal.component';
import { SignInModalComponent } from './shared/auth/sign-in-modal/sign-in-modal.component';
import { AuthService } from './shared/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { User } from './shared/models/user.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild(IonMenu) ionMenu: IonMenu;
  currentUser = null;
  currentUser2 = null;
  currentUser$: Observable<User>;
  userPromise: Promise<User>;
  ngUnsubscribe = new Subject<void>();

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
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    // this.afAuth.onAuthStateChanged(user => {
    //   console.log('app component constructor afAuth current user: ',user);
    //   this.currentUser = user;
    // });
    this.getCurrentUser();
  }

  ngAfterViewInit() {
    // this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser$ = this.authService.user$;
    this.currentUser$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
      if(data) {
        this.currentUser2 = data.firstName + ' ' + data.lastName;
      } else {
        this.currentUser2 = null;
      }
      console.log('app component getCurrentUser = ', this.currentUser2);
    });
  }

  // getCurrentUser() {
  //   this.currentUser = this.authService.currentUser;
  //   console.log('app component getCurrentUser result: ', this.currentUser);
  // }

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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
