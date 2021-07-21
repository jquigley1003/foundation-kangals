import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequirementToOwnPage } from './requirement-to-own.page';

const routes: Routes = [
  {
    path: '',
    component: RequirementToOwnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequirementToOwnPageRoutingModule {}
