import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutKangalsPage } from './about-kangals.page';

const routes: Routes = [
  {
    path: '',
    component: AboutKangalsPage
  },
  {
    path: 'photos',
    loadChildren: () => import('./photos/photos.module').then( m => m.PhotosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutKangalsPageRoutingModule {}
