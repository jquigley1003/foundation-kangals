import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PhotoModalComponent } from './photo-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [
    PhotoModalComponent
  ]
})
export class PhotoModalModule { }
