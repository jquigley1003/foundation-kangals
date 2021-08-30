import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutKangalsPageRoutingModule } from './about-kangals-routing.module';

import { AboutKangalsPage } from './about-kangals.page';
import { FooterModule } from '../shared/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutKangalsPageRoutingModule,
    FooterModule
  ],
  declarations: [AboutKangalsPage]
})
export class AboutKangalsPageModule {}
