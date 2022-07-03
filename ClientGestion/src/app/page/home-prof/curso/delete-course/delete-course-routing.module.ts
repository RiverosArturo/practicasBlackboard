import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteCoursePage } from './delete-course.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteCoursePageRoutingModule {}
