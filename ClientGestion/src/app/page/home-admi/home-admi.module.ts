import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAdmiPageRoutingModule } from './home-admi-routing.module';

import { HomeAdmiPage } from './home-admi.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAdmiPageRoutingModule
  ],
  declarations: [HomeAdmiPage]
})
export class HomeAdmiPageModule {}
