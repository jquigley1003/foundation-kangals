import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { User } from '../models/user.model';
import { LoadingService } from '../notify/loading.service';
import { ToastService } from '../notify/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  msg: string;
  fetchUsers$: Observable<any[]>;
  allUsers$: BehaviorSubject<any[]>;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private afStore: AngularFirestore,
    private afFunctions: AngularFireFunctions,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {
    this.initializeGetUsers();
  }

  async initializeGetUsers() {
    if(!this.allUsers$) {
      this.allUsers$ = new BehaviorSubject<any>([]);
      await this.fetchUsers();
      this.fetchUsers$
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            res => {
            this.allUsers$.next(res);
          },
        err => console.log('Error retrieving Users: ', err)
        );
    } else {
    }
  }

  async fetchUsers() {
    this.fetchUsers$ = this.afStore.collection<User>('users', ref => ref.orderBy('lastName'))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return{ id, ...data };
        })
      )
    );
  }

  getAllUsers() {
    return this.allUsers$.asObservable();
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

  async makeUserAdmin(user: User) {
    await this.loadingService.presentLoading(
      '...please wait as we make this user an admin',
      'bubbles',
    10000,
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
          }], 5000);
      })
      .catch(err => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          err.error,
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000);
      });
  }

  async removeAdminRole(user: User) {
    await this.loadingService.presentLoading(
      '...please wait as we remove this user as admin',
      'bubbles',
    10000,
    );
    this.afFunctions.httpsCallable('removeAdmin')(user)
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
          }], 5000);
      })
      .catch(err => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          err.error,
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000);
      });
  }

  async deleteUser(userId) {
    await this.loadingService.presentLoading(
      '...please wait while we delete this user',
      'bubbles',
    10000,
    );
    this.afStore.doc(`users/${userId}`).delete()
      .then(() => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          'The user has been deleted!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000 );
      })
      .catch(err => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          'You do not have the credentials to delete users!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
