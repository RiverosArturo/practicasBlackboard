import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultarEquipoPage } from './consultar-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultarEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultarEquipoPageRoutingModule {}
