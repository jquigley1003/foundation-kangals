import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afStore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth
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
  }
}
