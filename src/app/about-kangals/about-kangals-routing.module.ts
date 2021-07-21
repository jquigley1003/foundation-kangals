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
  },
  {
    path: 'breed',
    loadChildren: () => import('./breed/breed.module').then( m => m.BreedPageModule)
  },
  {
    path: 'requirement-to-own',
    loadChildren: () => import('./requirement-to-own/requirement-to-own.module').then( m => m.RequirementToOwnPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutKangalsPageRoutingModule {}
