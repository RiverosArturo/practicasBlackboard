import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaActividadPage } from './alta-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: AltaActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaActividadPageRoutingModule {}
