import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseKangalsPageRoutingModule } from './purchase-kangals-routing.module';

import { PurchaseKangalsPage } from './purchase-kangals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseKangalsPageRoutingModule
  ],
  declarations: [PurchaseKangalsPage]
})
export class PurchaseKangalsPageModule {}
