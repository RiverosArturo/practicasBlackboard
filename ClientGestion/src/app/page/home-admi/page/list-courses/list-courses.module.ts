import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCoursesPageRoutingModule } from './list-courses-routing.module';

import { ListCoursesPage } from './list-courses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCoursesPageRoutingModule
  ],
  declarations: [ListCoursesPage]
})
export class ListCoursesPageModule {}
