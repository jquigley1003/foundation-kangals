import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';
import { LoadingService } from '../notify/loading.service';
import { ToastService } from '../notify/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService implements OnDestroy {
  albums$ = new Observable<Album[]>();
  fetchPhotos$ = new Observable<Photo[]>();
  allPhotos$: BehaviorSubject<any[]>;
  currentUser = null;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private afStore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private authService: AuthService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {
    this.getCurrentUser();
    this.getAlbums();
    this.initializeGetPhotos();
  }

  getCurrentUser() {
    this.authService.currentUser$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.currentUser = data;
      });
  }

  async initializeGetPhotos() {
    if(!this.allPhotos$) {
      this.allPhotos$ = new BehaviorSubject<any>([]);
      await this.fetchPhotos();
      this.fetchPhotos$
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
            res => {
            this.allPhotos$.next(res);
          },
        err => console.log('Error retrieving Users: ', err)
        );
    } else {
    }
  }

  getAlbums() {
    this.albums$ = this.afStore.collection<Album>('albums', ref => ref.orderBy('title', 'asc'))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Album;
          const id = a.payload.doc.id;
          return{ id, ...data };
        })
      )
    );
  }

  fetchPhotos() {
    this.fetchPhotos$ = this.afStore.collection<Photo>('photos', ref => ref.orderBy('createdAt', 'desc'))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Photo;
          const id = a.payload.doc.id;
          return{ id, ...data };
        })
      )
    );
  }

  getAllPhotos() {
    return this.allPhotos$.asObservable();
  }

  createAlbum(album: Album) {
    const data = {
      title: album.title
    };
    return this.afStore.collection('albums').add(data);
  }

  addPhoto(photo: Photo) {
    console.log('photo service user id: ', this.currentUser);
    const timeStamp = new Date().toISOString();
    const newName = `${timeStamp}-FK.png`;
    const storageRef: AngularFireStorageReference = this.afStorage.ref(`/photos/${newName}`);

    const storageObs = from(storageRef.putString(photo.imageUrl, 'base64', {contentType: 'image/png'}));

    return storageObs.pipe(
      switchMap(obj => {
        console.log('FIN: ', obj);
        return obj.ref.getDownloadURL();
      }),
      switchMap(url => {
        console.log('my url: ', url);
        return this.afStore.collection('photos').add({
          albumId: photo.albumId,
          title: photo.title,
          imageName: newName,
          imageUrl: url,
          createdAt: timeStamp,
          creatorId: this.currentUser.uid
        });
      })
    );
  }

  async editPhoto(photo: Photo, data){
    await this.loadingService.presentLoading(
      '...please wait while we update the photo information',
      'bubbles',
    10000,
    );
    this.afStore.doc(`photos/${photo.id}`).set(data, { merge: true })
      .then(() => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          'The photo has been updated!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000 );
      })
      .catch(err => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          'You do not have the credentials to update photos!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000);
      });
  }

  async deletePhoto(photo: Photo) {
    await this.loadingService.presentLoading(
      '...please wait while we delete the photo',
      'bubbles',
    10000,
    );
    await this.afStore.doc(`photos/${photo.id}`).delete()
      .then(() => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          'The photo has been deleted!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000 );
      })
      .catch(err => {
        this.loadingService.dismissLoading();
        this.toastService.presentToast(
          'You do not have the credentials to delete photos!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
          }], 5000);
      });
      this.afStorage.refFromURL(photo.imageUrl).delete();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
