import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

import { from, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService implements OnDestroy {
  albums$ = new Observable<Album[]>();
  photos$ = new Observable<Photo[]>();
  currentUser = null;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private afStore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private authService: AuthService
  ) {
    this.getCurrentUser();
    this.getAlbums();
    this.getPhotos();
  }

  getCurrentUser() {
    this.authService.currentUser$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.currentUser = data;
      });
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

  getPhotos() {
    this.photos$ = this.afStore.collection<Photo>('photos', ref => ref.orderBy('createdAt', 'desc'))
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

  createAlbum(album: Album) {
    const data = {
      title: album.title
    };
    return this.afStore.collection('albums').add(data);
  }

  addPhoto(photo: Photo) {
    console.log('photo service user id: ', this.currentUser);
    const timeStamp = new Date().getTime();
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
          imageUrl: url,
          createdAt: timeStamp,
          creatorId: this.currentUser.uid
        });
      })
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
