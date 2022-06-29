import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProfPageRoutingModule } from './list-prof-routing.module';

import { ListProfPage } from './list-prof.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProfPageRoutingModule
  ],
  declarations: [ListProfPage]
})
export class ListProfPageModule {}
