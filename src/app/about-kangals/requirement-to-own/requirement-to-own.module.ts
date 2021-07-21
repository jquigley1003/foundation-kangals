import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequirementToOwnPageRoutingModule } from './requirement-to-own-routing.module';

import { RequirementToOwnPage } from './requirement-to-own.page';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequirementToOwnPageRoutingModule,
    FooterModule
  ],
  declarations: [RequirementToOwnPage]
})
export class RequirementToOwnPageModule {}
