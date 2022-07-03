import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultCoursePageRoutingModule } from './consult-course-routing.module';

import { ConsultCoursePage } from './consult-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultCoursePageRoutingModule
  ],
  declarations: [ConsultCoursePage]
})
export class ConsultCoursePageModule {}
