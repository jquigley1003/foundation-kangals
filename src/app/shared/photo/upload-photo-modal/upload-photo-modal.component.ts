import { Component, OnInit } from '@angular/core';

import { ModalController, NavParams } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { take } from 'rxjs/operators';

import { Photo } from '../../models/photo.model';
import { LoadingService } from '../../notify/loading.service';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-upload-photo-modal',
  templateUrl: './upload-photo-modal.component.html',
  styleUrls: ['./upload-photo-modal.component.scss'],
})
export class UploadPhotoModalComponent implements OnInit {
  albums = this.navParams.get('albums');
  chosenAlbum = null;
  myImage = null;
  capturedImage = null;
  photo: Photo = {
    albumId: '4lpvGH1HXPUBRgefq0wM',
    title: '',
    imageUrl: null,
    dateCreated: null,
    creatorId: this.navParams.get('creatorId')
  };

  constructor(
    private loadingService: LoadingService,
    private modalCtrl: ModalController,
    private photoService: PhotoService,
    private navParams: NavParams
  ) { }

  ngOnInit() {}

  pickAlbum(album) {
    this.photo.albumId = album.id;
    this.chosenAlbum = album.title;
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    // this.myImage = image.webPath;
    this.capturedImage = `data:image/jpeg;base64,${image.base64String}`;
    this.photo.imageUrl = image.base64String;
  }

  async uploadPhoto() {
    await this.loadingService.presentLoading(
      'Saving your photo...', 'bubbles', 15000);
    this.photoService.addPhoto(this.photo)
    .pipe(take(1))
    .subscribe(() => {
      this.loadingService.dismissLoading();
      this.modalCtrl.dismiss();
    });
  }
}
