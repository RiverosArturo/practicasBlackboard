import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarEquipoPage } from './generar-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarEquipoPageRoutingModule {}
