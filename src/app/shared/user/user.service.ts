import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

import { User } from '../models/user.model';
import { LoadingService } from '../notify/loading.service';
import { ToastService } from '../notify/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  msg: string;

  constructor(
    private afStore: AngularFirestore,
    private afFunctions: AngularFireFunctions,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  createUserData(uid: string, email: string, firstName: string, lastName: string) {
    const data: User = {
      uid,
      email,
      firstName,
      lastName,
      address: {
        street: null,
        unit: null,
        city: null,
        state: null,
        zipcode: null,
        country: null
      },
      phone: null,
      roles: {
        admin: false,
      }
    };
    return this.afStore.doc(`users/${uid}`).set(data);
    // cloud function will automatically set the custom user claims (admin: false);
  }

  async makeUserAdmin(user: User) {
    await this.loadingService.presentLoading(
      '...please wait as we make this user an admin',
      'bubbles',
    5000,
    );
    this.afFunctions.httpsCallable('addAdmin')(user)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          this.msg,
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 5000);
        // console.log({resp});
      })
      .catch(err => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          err.error,
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 5000);
        // console.log({err});
      });
  }
}
