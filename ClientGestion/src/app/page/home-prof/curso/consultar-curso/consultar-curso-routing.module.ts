import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultarCursoPage } from './consultar-curso.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultarCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultarCursoPageRoutingModule {}
