import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteCoursePageRoutingModule } from './delete-course-routing.module';

import { DeleteCoursePage } from './delete-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteCoursePageRoutingModule
  ],
  declarations: [DeleteCoursePage]
})
export class DeleteCoursePageModule {}
