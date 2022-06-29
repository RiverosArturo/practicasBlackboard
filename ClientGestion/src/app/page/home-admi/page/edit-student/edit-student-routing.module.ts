import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdmiPage } from '../../home-admi.page';

import { EditStudentPage } from './edit-student.page';

const routes: Routes = [
  {
    path: '',
    component: EditStudentPage
  },
  {
    path: 'home-admi',
    component: HomeAdmiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditStudentPageRoutingModule {}
