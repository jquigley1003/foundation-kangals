import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController, NavParams } from '@ionic/angular';

import { take } from 'rxjs/operators';

import { Album } from '../../models/album.model';
import { Photo } from '../../models/photo.model';
import { AuthService } from '../../auth/auth.service';
import { PhotoService } from '../photo.service';
import { AlertService } from '../../notify/alert.service';
import { ToastService } from '../../notify/toast.service';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
})
export class PhotoModalComponent implements OnInit {
  @ViewChild('slider', {read: ElementRef})slider: ElementRef;

  img = this.navParams.get('img');
  editPhotoForm: FormGroup;
  currentAlbums = [];
  isAdmin = false;

  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private authService: AuthService,
    private alertService: AlertService,
    private toastService: ToastService
  ) {
    this.getAllAlbums()
    .then(() => {
      this.initializeForm();
    });
  }

  ngOnInit() {
    this.authService.isAdmin$
      .pipe(take(1))
      .subscribe((res) => {
        this.isAdmin = res;
      });
  }

  async getAllAlbums() {
    this.photoService.albums$
      .pipe(take(1))
      .subscribe((res) => {
        this.currentAlbums = res;
        console.log('current albums: ', this.currentAlbums);
      });
  }

  initializeForm() {
    this.editPhotoForm = this.formBuilder.group({
      title: [this.img.title],
      album: [this.img.albumId]
    });
  }

  compareWith(o1: Album, o2: Album) {
    return o1 === o2;
  }

  async onUpdatePhoto() {
    const newTitle = this.editPhotoForm.value.title;
    const newAlbumId = this.editPhotoForm.value.album;

    const data = {
      title: newTitle,
      albumId: newAlbumId
    };
    console.log('update photo in progress: ',data);
    await this.photoService.editPhoto(this.img, data);
  }

  async onDeletePhoto(photo: Photo) {
    this.alertService.presentAlert(
      'Are You Sure?',
      'You will permanently delete this photo',
      'Choosing "Yes, Delete" will permanently remove this photo from the database',
      [
        {
          text: 'Cancel',
          cssClass: 'alertCancel',
          role: 'cancel',
          handler: () => {
            console.log('You did not delete this photo');
            this.toastService.presentToast(
              `Deletion of photo canceled.`,
              'middle',
              [{
                text: 'OK',
                role: 'cancel',
              }], 5000);
          }
        },
        {
          text: 'Yes, Delete',
          cssClass: 'alertDanger',
          handler: () => {
            this.deletePhotoConfirmed(photo);
          }
        }
      ]
    );
  }

  deletePhotoConfirmed(photo: Photo) {
    this.photoService.deletePhoto(photo);
  }

  zoomAction(zoomIn: boolean) {
    const zoom = this.slider.nativeElement.swiper.zoom;
    if(zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
