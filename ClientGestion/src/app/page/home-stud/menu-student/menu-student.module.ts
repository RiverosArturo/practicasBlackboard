import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuStudentPageRoutingModule } from './menu-student-routing.module';

import { MenuStudentPage } from './menu-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuStudentPageRoutingModule
  ],
  declarations: [MenuStudentPage]
})
export class MenuStudentPageModule {}
