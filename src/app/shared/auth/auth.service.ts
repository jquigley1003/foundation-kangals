import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserService } from '../user/user.service';

import { User } from '../models/user.model';
import { ToastService } from '../notify/toast.service';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = null;
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private userService: UserService,
    private toastService: ToastService
  ) {
    // this.afAuth.onAuthStateChanged(user => {
    //   console.log('Auth Service current user: ',user);
    //   this.currentUser = user;
    // });
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of (null);
        }
      })
    );
   }

  async register(newUser) {
    const fullName = newUser.firstName + ' ' + newUser.lastName;

    await this.afAuth.createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((credentials) => {
      this.userService.createUserData(credentials.user.uid, newUser.email, newUser.firstName, newUser.lastName);
      credentials.user.updateProfile({
        displayName: fullName
      })
      .then(() => {
        credentials.user.sendEmailVerification()
        .then(() => {
          console.log('Email verification was sent');
        }).catch((error) => {
          console.log('Error sending verification email: ', error);
          this.handleError(error);
        });
      }).catch((error) => {
        console.log('Error adding displayName: ', error);
        this.handleError(error);
      });
    }).catch((error) => {
      console.log('Error creating new user: ', error);
      this.handleError(error);
    });
  }

  signIn({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  private handleError(error: Error) {
    console.error(error);
    this.toastService.presentToast(
      error.message,
      'middle',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 5000);
  }
}
