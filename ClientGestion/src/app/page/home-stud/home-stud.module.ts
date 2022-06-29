import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeStudPageRoutingModule } from './home-stud-routing.module';

import { HomeStudPage } from './home-stud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeStudPageRoutingModule
  ],
  declarations: [HomeStudPage]
})
export class HomeStudPageModule {}
