import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdmiPage } from '../../home-admi.page';

import { EditProfPage } from './edit-prof.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfPage
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
export class EditProfPageRoutingModule {}
