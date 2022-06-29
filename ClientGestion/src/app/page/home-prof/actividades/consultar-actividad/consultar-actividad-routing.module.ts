import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultarActividadPage } from './consultar-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultarActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultarActividadPageRoutingModule {}
