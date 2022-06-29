import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCoursesPage } from './list-courses.page';

const routes: Routes = [
  {
    path: '',
    component: ListCoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCoursesPageRoutingModule {}
