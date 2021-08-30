import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreedPageRoutingModule } from './breed-routing.module';

import { BreedPage } from './breed.page';
import { FooterModule } from 'src/app/shared/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreedPageRoutingModule,
    FooterModule
  ],
  declarations: [BreedPage]
})
export class BreedPageModule {}
