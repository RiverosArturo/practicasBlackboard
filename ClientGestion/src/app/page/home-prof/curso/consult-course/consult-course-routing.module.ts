import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultCoursePage } from './consult-course.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultCoursePageRoutingModule {}
