import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseKangalsPage } from './purchase-kangals.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseKangalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseKangalsPageRoutingModule {}
