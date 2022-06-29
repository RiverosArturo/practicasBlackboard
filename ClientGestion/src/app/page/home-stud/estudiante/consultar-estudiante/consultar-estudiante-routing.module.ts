import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultarEstudiantePage } from './consultar-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultarEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultarEstudiantePageRoutingModule {}
