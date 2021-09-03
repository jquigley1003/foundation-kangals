import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPhotoModalComponent } from './upload-photo-modal.component';



@NgModule({
  declarations: [
    UploadPhotoModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class UploadPhotoModalModule { }
