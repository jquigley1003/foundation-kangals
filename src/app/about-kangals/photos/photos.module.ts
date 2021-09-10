import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotosPageRoutingModule } from './photos-routing.module';

import { PhotosPage } from './photos.page';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { PhotoModalModule } from 'src/app/shared/photo/photo-modal/photo-modal.module';
import { AlbumModalModule } from 'src/app/shared/photo/album-modal/album-modal.module';
import { UploadPhotoModalModule } from 'src/app/shared/photo/upload-photo-modal/upload-photo-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotosPageRoutingModule,
    FooterModule,
    PhotoModalModule,
    AlbumModalModule,
    UploadPhotoModalModule,
    FooterModule
  ],
  declarations: [PhotosPage]
})
export class PhotosPageModule {}
