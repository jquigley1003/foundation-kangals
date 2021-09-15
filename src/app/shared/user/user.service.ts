import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from '../models/user.model';
import { LoadingService } from '../notify/loading.service';
import { ToastService } from '../notify/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  msg: string;
  allUsers$: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);
  ngUnsubscribe = new Subject<void>();

  constructor(
    private afStore: AngularFirestore,
    private afFunctions: AngularFireFunctions,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {
    this.fetchUsers();
  }

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

  fetchUsers() {
    this.afStore.collection<User>('users', ref => ref.orderBy('lastName'))
    .snapshotChanges()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
        res => {
        this.allUsers$.next(res);
      },
    err => console.log('Error retrieving Users ', err.error)
    );
  }

  getAllUsers() {
    return this.allUsers$.asObservable();
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
