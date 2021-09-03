import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afStore: AngularFirestore
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
}
