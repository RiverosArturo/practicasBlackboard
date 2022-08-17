import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuStudentPage } from './menu-student.page';

const routes: Routes = [
  {
    path: '',
    component: MenuStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuStudentPageRoutingModule {}
