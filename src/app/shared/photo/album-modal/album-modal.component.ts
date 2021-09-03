import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { PhotoService } from '../photo.service';
import { AlertService } from '../../notify/alert.service';
import { LoadingService } from '../../notify/loading.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-album-modal',
  templateUrl: './album-modal.component.html',
  styleUrls: ['./album-modal.component.scss'],
})
export class AlbumModalComponent implements OnInit {
  albumForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private photoService: PhotoService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {
    this.albumForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onAlbumForm() {
    const title = this.albumForm.value.title.trim();
    const data: Album = {
      title
    };

    await this.loadingService.presentLoading(
      'Creating your new album...', 'bubbles', 15000);

    await this.photoService.createAlbum(data)
    .then(async () => {
      this.loadingService.dismissLoading();
    }, async err => {
      this.loadingService.dismissLoading();
      await this.alertService.presentAlert(
        'Error creating new album','please try again', err.message, ['OK']
      );
    });
    this.albumForm.reset();
    await this.modalCtrl.dismiss();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
