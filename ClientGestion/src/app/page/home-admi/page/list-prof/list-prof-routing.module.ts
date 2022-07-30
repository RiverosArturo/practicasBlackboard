import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfPage } from '../edit-prof/edit-prof.page';

import { ListProfPage } from './list-prof.page';

const routes: Routes = [
  {
    path: '',
    component: ListProfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class ListProfPageRoutingModule {}
